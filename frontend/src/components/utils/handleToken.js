export const setToken = (data) => {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
};

export const deleteToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// export const getAccessToken = () => {
//     return localStorage.getItem('access_token')
// }
