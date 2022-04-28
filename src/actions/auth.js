import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui"; // desde las actions

import Swal from 'sweetalert2'; // Mensajes de alertas
import { noteCleaningLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => { // retorna un callBack, el dispatch es proveido por Thunk

        dispatch( startLoading() );
    
        return firebase.auth().signInWithEmailAndPassword( email, password )
            .then(({ user }) => {

                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
                
            })
            .catch (  e => {
           //     console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

        //dispatch( login(123, 'Pedro' ) );
    
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( e => {
                console.log(e);
            })

    }
} 


export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
               dispatch(
                   login ( user.uid, user.displayName )
               )
            });
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
};

export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteCleaningLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})











