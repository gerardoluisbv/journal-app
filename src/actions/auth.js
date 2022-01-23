import { types } from "../types/types"

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => { // retorna un callBack, el dispatch es proveido por Thunk

        setTimeout(() => {
            dispatch( login(123, 'Pedro' ) );
        }, 3500);

    }
}


export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }        
}