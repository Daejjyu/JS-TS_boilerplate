const api = {}

api.getQuery = (obj) => {
    return '?' + Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('&')
}

api.getUrl = (path, obj = null) => {
    const url = process.env.API_END_POINT + path
    return obj ? url + api.getQuery(obj) : url;
}

api.get = async (url) => {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('서버의 상태가 이상합니다!')
        }
        return await res.json()
    } catch (e) {
        throw new Error(`무언가 잘못 되었습니다! ${e.message}`)
    }
}

export default api;