import { CURRENTUSER_LOGIN, CURRENTUSER_LOGOUT, CURRENTUSER_CHECKED } from './actions';

interface State {
    checked: boolean;
    id: null | string;
    permissions: {
        write: boolean;
    };
}

const initialState: State = {
    checked: false,
    id: null,
    permissions: {
        write: false
    }
};

export function currentUser(state = initialState, action): State {
    switch(action.type) {
        case CURRENTUSER_LOGIN:
            return {
                checked: true,
                id: action.payload.id,
                permissions: action.payload.permissions
            };

        case CURRENTUSER_LOGOUT:
            return {
                checked: true,
                id: null,
                permissions: {
                    write: false
                }
            };

        case CURRENTUSER_CHECKED:
            return {
                ...state,
                checked: true
            };

        default:
            return state;
    }
}
