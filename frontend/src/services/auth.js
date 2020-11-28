console.log('logperfil', localStorage.getItem('logperfil') );
export const isAuthenticated = () => localStorage.getItem('logperfil') == 0 ? true : true;
export const getToken = () => localStorage.getItem('logperfil') == 0 ? true : true;
export const logout = () => {
    localStorage.removeItem('logperfil');
};