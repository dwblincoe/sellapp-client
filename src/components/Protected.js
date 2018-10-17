import React from 'react'
import Auth from './LogInSignUp/Auth'
import Profile from './Profile'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

const Protected = (props) => {
        if(props.sessionToken === localStorage.getItem('token')){
            console.log(props.sessionToken)
            return(
                <Router>
                    <Route path='/profile' exact>
                        <Profile 
                        setToken={props.setToken} 
                        sessionToken={props.sessionToken}
                        setId={props.setId}
                        itemId={props.itemId}
                        />
                    </Route>
                </Router>
            )
        } else {
            return(
                <Route path='/auth' exact>
                    <Auth 
                    setToken={props.setToken} 
                    />
                </Route>
            )
        }
}

export default Protected