import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { firebase } from '../../firebase/firebase-config';

import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth:{},
    ui: {
        loading:false,
        msgError:null
    },
    notes: {
            active: {
                id: 'ABC',
            },
            notes: []
    }

};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar al login si esta autenticado', async () => {

        let user;
        
        await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456')
            user = userCred.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>  
            );
        }); 
        
        expect(login).toHaveBeenCalledWith("kJPuBI92VqdimOZUkUkBlq3elk32", null);
        
        

    });

});
