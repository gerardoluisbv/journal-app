import { setError, removeError, startLoading, finishLoading } from '../../../src/actions/ui';
import { types } from '../../types/types';


describe('Pruebas en iu-actions', () => {
    
    test('todas las acciones deben de funcionar', () => {
        
        const action = setError('Error Returned');

        expect( action ).toEqual( {
            type: types.uiSetError,
            payload: 'Error Returned'
        } );

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( removeErrorAction ).toEqual( {
            type: types.uiRemoveError
        } );

        expect( startLoadingAction ).toEqual( {
            type: types.uiStartLoading
        } );

        expect( finishLoadingAction ).toEqual( {
            type: types.uiFinishLoading
        } );

    });

});