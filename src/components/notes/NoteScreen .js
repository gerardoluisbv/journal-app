import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar'

export const NoteScreen  = () => {

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { body, title } = formValues;
    
    const dispatch = useDispatch();

    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    
    }, [reset, note])
    
    useEffect(() => {
        
        dispatch ( activeNote( formValues, { ...formValues } ) );
    
    }, [formValues, dispatch])
    

    return (
        <div className='notes__main-content'>
            
            <NotesAppBar />

            <div className='notes__content'>

                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={ title }
                    name= "title"
                    onChange = { handleInputChange }
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    value={ body }
                    name= "body"
                    onChange = { handleInputChange }
                ></textarea>

                {
                    (note.url) 
                    &&
                        (<div className='notes__image'>
                            <img 
                                src='https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg'
                                alt='imagen'
                            />
                        </div>)
                }

            </div>
            

        </div>
    )
}
