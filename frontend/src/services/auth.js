console.log('logperfil', sessionStorage.getItem('logperfil') );

export const isAuthenticated = () => sessionStorage.getItem('conectado') == 0 ? true : false;
export const getToken = () => sessionStorage.getItem('conectado') == 0 ? true : false;
export const logout = () => {
    sessionStorage.removeItem('logperfil');
    sessionStorage.removeItem('conectado');
};