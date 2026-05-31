'use server'

import { client } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export async function registerUser(formData) {
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')

  if (!username || !email || !password) {
    return { error: 'Wszystkie pola są wymagane' }
  }

  // sprawdzenie czy user istnieje
  const userKeys = await client.keys('user:*')

  for (const key of userKeys) {
    const parts = key.split(':')

    if (parts.length !== 2) continue
    if (key === 'user:id') continue

    const type = await client.type(key)
    if (type !== 'hash') continue

    const existingUsername = await client.hGet(key, 'username')
    const existingEmail = await client.hGet(key, 'email')

    if (existingUsername === username) {
      return { error: 'Username zajęty' }
    }

    if (existingEmail === email) {
      return { error: 'Email zajęty' }
    }
  }

  // nowe id
  const userId = await client.incr('user:id')

  // hash hasła
  const password_hash = await bcrypt.hash(password, 10)

  // zapis usera
  await client.hSet(`user:${userId}`, {
    username,
    email,
    password_hash,
    registered_at: new Date().toISOString(),
    playlists_count: 0,
    role: 'user'
  })

  // tworzenie pustych setów
  await client.sAdd(`user:${userId}:liked_tracks`, '')
  await client.sRem(`user:${userId}:liked_tracks`, '')

  await client.sAdd(`user:${userId}:liked_artists`, '')
  await client.sRem(`user:${userId}:liked_artists`, '')

  await client.sAdd(`user:${userId}:liked_playlists`, '')
  await client.sRem(`user:${userId}:liked_playlists`, '')

  await client.sAdd(`user:${userId}:playlists`, '')
  await client.sRem(`user:${userId}:playlists`, '')

  redirect('/login')
}

export async function loginUser(formData) {
  const username = formData.get('username')
  const password = formData.get('password')

  const userKeys = await client.keys('user:*')

  let foundUser = null
  let foundUserId = null

  for (const key of userKeys) {
  const parts = key.split(':')

  if (parts.length !== 2) continue
  if (key === 'user:id') continue

  const type = await client.type(key)
  if (type !== 'hash') continue

  const existingUsername = await client.hGet(key, 'username')

  if (existingUsername === username) {
    foundUser = await client.hGetAll(key)
    foundUserId = key.split(':')[1]
    break
  }
}

  if (!foundUser) {
    return { error: 'Niepoprawny login lub hasło' }
  }

  const validPassword = await bcrypt.compare(
    password,
    foundUser.password_hash
  )

  if (!validPassword) {
    return { error: 'Niepoprawny login lub hasło' }
  }

  // session
  const sessionToken = uuidv4()

  await client.hSet(`session:${sessionToken}`, {
    userId: foundUserId,
    username: foundUser.username,
    role: foundUser.role
  })

  // cookie
  const cookieStore = await cookies()

  cookieStore.set('session_token', sessionToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  redirect('/')
}

export async function logoutUser() {
  const cookieStore = await cookies()

  const sessionToken = cookieStore.get('session_token')?.value

  if (sessionToken) {
    await client.del(`session:${sessionToken}`)
  }

  cookieStore.delete('session_token')

  redirect('/login')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()

  const sessionToken = cookieStore.get('session_token')?.value

  if (!sessionToken) {
    return null
  }

  const session = await client.hGetAll(`session:${sessionToken}`)

  if (!session.userId) {
    return null
  }

  return session
}
export async function getCurrentUserData() {
  const session = await getCurrentUser()

  if (!session) {
    return null
  }

  const userData = await client.hGetAll(
    `user:${session.userId}`
  )

  return {
    id: session.userId,
    ...userData
  }
}
export async function getAllUsers() {
  const keys = await client.keys('user:*')
  const users = []

  for (const key of keys) {
    if (key.split(':').length > 2) continue
    if (key === 'user:id') continue

    const user = await client.hGetAll(key)

    users.push({
      id: key.split(':')[1],
      username: user.username,
      email: user.email,
      registered_at: user.registered_at,
      playlists_count: user.playlists_count,
      role: user.role
    })
  }

  return users
}
export async function getAdminStats() {
  const userKeys = await client.keys('user:*')
  const trackKeys = await client.keys('track:*')
  const sessionKeys = await client.keys('session:*')
  const playlistKeys = await client.keys('playlist:*')

  const users = userKeys.filter(key => {
    const parts = key.split(':')
    return parts.length === 2 && key !== 'user:id'
  })

  const tracks = trackKeys.filter(key => {
    const parts = key.split(':')
    return parts.length === 2 && key !== 'track:id'
  })

  return {
    usersCount: users.length,
    tracksCount: tracks.length,
    sessionsCount: sessionKeys.length,
    playlistsCount: playlistKeys.length
  }
}