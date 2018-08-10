import { ReducersMapObject } from 'redux';

import * as fromCurrentUser from './currentuser';

export const reducers: ReducersMapObject = {
    ...fromCurrentUser.reducers
};

export const actions = {
    currentUser: fromCurrentUser.actions
};