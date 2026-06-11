module.exports = [
"[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"0090a4a8dcf42da16fadd7c254082011bbf4b9ff06":{"name":"getUserPlaylists"},"4017a78de189e6a6088ca062ae33a98009b19a1c43":{"name":"getPlaylistData"},"4085729de4873cb6b54f7c4b58cd1b2946b6618fc9":{"name":"createPlaylist"},"60420f2d90d2815579c4cf332078aa5c49727aaa6b":{"name":"addTrackToPlaylist"}},"src/app/actions/playlists.js",""] */ __turbopack_context__.s([
    "addTrackToPlaylist",
    ()=>addTrackToPlaylist,
    "createPlaylist",
    ()=>createPlaylist,
    "getPlaylistData",
    ()=>getPlaylistData,
    "getUserPlaylists",
    ()=>getUserPlaylists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function createPlaylist(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Musisz być zalogowany, aby utworzyć playlistę.'
        };
    }
    const name = formData.get('name')?.toString().trim();
    const description = formData.get('description')?.toString().trim() || '';
    if (!name) {
        return {
            error: 'Nazwa playlisty jest wymagana.'
        };
    }
    const playlistId = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].incr('playlist:id');
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hSet(`playlist:${playlistId}`, {
        name,
        description,
        created_by: user.userId,
        created_at: new Date().toISOString(),
        track_count: 0
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sAdd(`playlist:${playlistId}:tracks`, '');
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sRem(`playlist:${playlistId}:tracks`, '');
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sAdd(`user:${user.userId}:playlists`, String(playlistId));
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hIncrBy(`user:${user.userId}`, 'playlists_count', 1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/playlists');
    return {
        success: true,
        playlistId
    };
}
async function getUserPlaylists() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return [];
    }
    const playlistIds = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sMembers(`user:${user.userId}:playlists`);
    const playlists = [];
    for (const id of playlistIds){
        const playlist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hGetAll(`playlist:${id}`);
        if (!playlist || !playlist.name) continue;
        playlists.push({
            id,
            name: playlist.name,
            description: playlist.description || '',
            created_at: playlist.created_at,
            track_count: Number(playlist.track_count || 0)
        });
    }
    return playlists.sort((a, b)=>a.name.localeCompare(b.name));
}
async function getPlaylistData(playlistId) {
    const playlist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hGetAll(`playlist:${playlistId}`);
    if (!playlist || !playlist.name) {
        return null;
    }
    const trackIds = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sMembers(`playlist:${playlistId}:tracks`);
    const tracks = [];
    for (const id of trackIds){
        if (!id) continue;
        const track = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hGetAll(`track:${id}`);
        if (track && track.title) {
            tracks.push({
                id,
                title: track.title,
                artist: track.artist_id ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hGet(`artist:${track.artist_id}`, 'name') : 'Nieznany artysta',
                duration: track.duration,
                genre: track.genre
            });
        }
    }
    return {
        id: playlistId,
        ...playlist,
        tracks
    };
}
async function addTrackToPlaylist(playlistId, trackId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Musisz się zalogować.'
        };
    }
    const playlist = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hGetAll(`playlist:${playlistId}`);
    if (!playlist || playlist.created_by !== user.userId) {
        return {
            error: 'Nie możesz dodać utworu do tej playlisty.'
        };
    }
    const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sIsMember(`playlist:${playlistId}:tracks`, String(trackId));
    if (exists) {
        return {
            error: 'Ten utwór jest już na tej playliście.'
        };
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].sAdd(`playlist:${playlistId}:tracks`, String(trackId));
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].hIncrBy(`playlist:${playlistId}`, 'track_count', 1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/playlists');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPlaylist,
    getUserPlaylists,
    getPlaylistData,
    addTrackToPlaylist
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPlaylist, "4085729de4873cb6b54f7c4b58cd1b2946b6618fc9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserPlaylists, "0090a4a8dcf42da16fadd7c254082011bbf4b9ff06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlaylistData, "4017a78de189e6a6088ca062ae33a98009b19a1c43", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTrackToPlaylist, "60420f2d90d2815579c4cf332078aa5c49727aaa6b", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(userinterface)/playlists/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(userinterface)/playlists/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "001e757d19bc21c18afaf9faa4a7fbf5347eb5e8c6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUserData"],
    "002ee1a0be8c7616474b7719371d85e5a0b04db029",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllUsers"],
    "00411a20f4b133e90a1e782bd53266ac52345c0086",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"],
    "006cf827c45d125e7791fcb4a03d6b16a8f3d70e92",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutUser"],
    "0090a4a8dcf42da16fadd7c254082011bbf4b9ff06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserPlaylists"],
    "00ca8cad5fc3928e13744a9243d645e3a31ecfb346",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminStats"],
    "400c5858bf27b2afe8e1fd70cd43ed27071d209b7f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteUser"],
    "4017a78de189e6a6088ca062ae33a98009b19a1c43",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPlaylistData"],
    "40657f493718b37db3d63a78c47290faf16566cfba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginUser"],
    "406601c5726a8cace37e2e5e596eb1d03b85f1e69a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerUser"],
    "4085729de4873cb6b54f7c4b58cd1b2946b6618fc9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPlaylist"],
    "60420f2d90d2815579c4cf332078aa5c49727aaa6b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTrackToPlaylist"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$userinterface$292f$playlists$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(userinterface)/playlists/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/auth.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/playlists.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$userinterface$292f$playlists$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$userinterface$292f$playlists$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$playlists$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=_1kvs380._.js.map