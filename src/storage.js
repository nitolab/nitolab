
export const ACCESS_TOKEN_KEY = 'token';

export function getAccessToken() {
    let session = sessionStorage.getItem(ACCESS_TOKEN_KEY)
    if(!!session){
        session = JSON.parse(session)
        if(Date.now() > session.expire){
            clearAccessToken()
            return null
        }
        return session
    }
    return null
}

export function clearAccessToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function hasToken() {
    const accessToken = getAccessToken();
    return !!accessToken;
}
