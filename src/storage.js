
export const ACCESS_TOKEN_KEY = 'token';

export function getAccessToken() {
    let session = localStorage.getItem(ACCESS_TOKEN_KEY)
    if(!!session){
        session = JSON.parse(session)
        if(Date.now() / 1000 > session.expire){
            clearAccessToken()
            return null
        }
        return session
    }
    return null
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function hasToken() {
    const accessToken = getAccessToken();
    return !!accessToken;
}
