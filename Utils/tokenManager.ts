import axios from 'axios';
// import cookie from 'react-cookies';
import cookie from 'react-cookies';

import useStore from '../store';

function setToken(jwt: string) {
    // console.log('setToken', jwt);
    // axios.defaults.headers.common.Authorization = 'Bearer ' + jwt;

    if (jwt) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;

        // const expires = new Date();
        // expires.setDate(Date.now() + 60 * 60 * 24 * 7);

        /*
            Cookie on IOS
            1. you must set path to '/'
            2. you must set maxAge(or the cookie will be deleted when the browser is closed. {is set as Session Cookie})
        */
        // cookie.save('jsonwebtoken', jwt, {
        //     path: '/',
        //     httpOnly: false,
        //     maxAge: 60 * 60 * 24 * 7,
        //     domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_TARGET_DOMAIN : undefined,
        // });
    }

    // console.log('ax', axios.defaults.headers.common['Authorization']);

    // cookie.save('jsonwebtoken', jwt, )
}

function deleteToken() {
    axios.defaults.headers.common['Authorization'] = null;
    cookie.remove('jsonwebtoken');
}

export { setToken, deleteToken };
