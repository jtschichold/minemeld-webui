import { ReducersMapObject } from 'redux';

import { currentUser } from './reducers';
import { login, logout, checked } from './actions';

export const reducers: ReducersMapObject = {
    currentUser
};

export const actions = {
    login,
    logout,
    checked
};
