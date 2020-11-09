import React from 'react';

export const API_BASE_URL = 'http://127.0.0.1:8080/localhost:44374';
export const ACCESS_TOKEN_NAME = 'login_access_token';

const userContext = React.createContext({user: {}, setUser:()=> null }); 
export {
  userContext
};