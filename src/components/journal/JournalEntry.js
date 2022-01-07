import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            
            <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize:'cover',
                    backgroundImage: 'url(https://www.akamai.com/content/dam/site/im-demo/perceptual-standard.jpg?imbypass=true)'
                }}
            ></div>

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo dia
                </p>
                <p className='journal__entry-content'>
                Pariatur culpa dolore laborum amet tempor aliqua ullamco.
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>22</h4>
            </div>

        </div>
    )
}
