import axios from 'axios';
// import cookie from 'react-cookies';
function setToken(jwt: string) {
    console.log('setToken', jwt);
    // axios.defaults.headers.common.Authorization = 'Bearer ' + jwt;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    // console.log('ax', axios.defaults.headers.common['Authorization']);

    // cookie.save('jsonwebtoken', jwt, )
}

export { setToken };
