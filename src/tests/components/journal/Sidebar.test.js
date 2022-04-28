
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import React from 'react';
import { Sidebar } from '../../../components/journal/Sidebar';

import "@testing-library/jest-dom";

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { types } from "../../../types/types";
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth:{
        uid:'123',
        name:'Gerardo'
    },
    ui: {
        loading:false,
        msgError:null
    },
    notes: {
        notes:[],
        active:null
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));



const wrapper = mount(
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
);



describe('Pruebas en el <Sidebar />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
       expect(wrapper).toMatchSnapshot();
       
    });

    test('debe de llamar el logout', () => {
        wrapper.find('.btn').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });
    
    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
     
    });

});