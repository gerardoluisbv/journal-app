import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
  } from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
   
    return (
        <div className='auth__main'>

            <div className='auth__box-container'>
                <Router>
                        <Switch>
                            <Route path="/auth" component={ AuthRouter } />
                            <Route exact path="/" component={ JournalScreen } />

                            <Redirect to="/auth/login" />
                        </Switch>
                </Router>
            </div>
        </div>
    
    )
}
