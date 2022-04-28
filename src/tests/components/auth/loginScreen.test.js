import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";

import "@testing-library/jest-dom";

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";


jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth:{},
    ui: {
        loading:false,
        msgError:null
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>
    
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    })    
    
    test('debe de mostrarse correctamente', () => {
     
        expect( wrapper ).toMatchSnapshot();
    
    });

    test('debe de disparar la accion de startGoogleLogin', () => {
        
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();

    });
    
    test('debe de disparar la accion de startLoginEmailPassword', () => {
        
        
        //wrapper.find('form').simulate('submit');

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('gerardoluis812@gmail.com','123456');

    });
   
}); 