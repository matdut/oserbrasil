console.log('logperfil', localStorage.getItem('logperfil') );

export const isAuthenticated = () => localStorage.getItem('conectado') == 0 ? true : false;
export const getToken = () => localStorage.getItem('conectado') == 0 ? true : false;
export const logout = () => {
    localStorage.removeItem('logperfil');
    localStorage.removeItem('conectado');
};