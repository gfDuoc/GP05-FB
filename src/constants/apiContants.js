import React from 'react';

export const API_BASE_URL = 'http://localhost:63826';
export const API_BASE_URL_ALT = 'http://127.0.0.1:8000';
export const ACCESS_TOKEN_NAME = 'login_access_token';

const UserContext = React.createContext({user:{},setUser:() => null})
export{UserContext}