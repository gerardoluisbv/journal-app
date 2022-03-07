/*
    {
        notes:[],
        active: null,
        active: {
            id: 'KGOUHOF65W46WE64',
            title:'',
            body:'',
            imageUrl:'',
            date: 5168465136

        }

    }
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

   switch (action.type) {
             
       case types.notesActive:
           return {
               ...state,
               active: {
                   ...action.payload
               }
           }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
   
       default:
           return state;
   }



}