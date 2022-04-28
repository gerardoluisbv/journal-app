import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";

import "@testing-library/jest-dom";

import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';

import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen ';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        uid: '123',
        name: 'Gerardo'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
};


let store = mockStore(initialState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
);

describe('Pruebas en NoteScreen', () => {
    
    test('debe de mostrarse correctamente', () => {
       expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenCalled();

        
    })
    



});