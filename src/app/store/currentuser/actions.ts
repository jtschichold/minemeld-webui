import { MineMeldAPIService } from "../../services/minemeldapi";

export const CURRENTUSER_LOGIN: string = 'CURRENTUSER_LOGIN';
export const CURRENTUSER_LOGOUT: string = 'CURRENTUSER_LOGOUT';
export const CURRENTUSER_CHECKED: string = 'CURRENTUSER_CHECKED';

export function login(username: string) {
    return {
        type: CURRENTUSER_LOGIN,
        payload: {
            id: username,
            permissions: {
                write: true
            }
        }
    };
};

export function logout() {
    return {
        type: CURRENTUSER_LOGOUT
    };
};

export function checked() {
    return {
        type: CURRENTUSER_CHECKED
    };
};
