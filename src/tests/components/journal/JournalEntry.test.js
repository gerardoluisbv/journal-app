
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import React from 'react';

import "@testing-library/jest-dom";

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://somewhere/foto.jpg'
}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...nota } /> 
    </Provider>
);

describe('Pruebas en el <JournalEntry />', () => {
    
    test('debe de mostrarse corretamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, {...nota} )
        );

    });

});