import { getArtists } from '@/app/actions/artist_modify'
import { getAlbums } from '@/app/actions/album_modify'
import AddSongForm from './AddSongForm'

export default async function Create() {
  const artists = await getArtists()
  const albums = await getAlbums()

  return <AddSongForm artists={artists} albums={albums} />
}