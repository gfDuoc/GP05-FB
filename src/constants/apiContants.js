import React from 'react';

export const API_BASE_URL = 'http://localhost:3333';
export const ACCESS_TOKEN_NAME = 'login_access_token';

const userContext = React.createContext({user: {}}); 
export {
  userContext
};