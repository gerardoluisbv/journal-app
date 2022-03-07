import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar'

export const NoteScreen  = () => {

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { body, title } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
    
    }, [reset, note])
    

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
                    onChange = { handleInputChange }
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    value={ body }
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
