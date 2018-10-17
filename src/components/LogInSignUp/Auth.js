import React, {Component} from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'


export default class Auth extends Component{  
    constructor(){
        super()
        this.state = {
            isLoginOpen: true,
            isSignupOpen: false
        }
    }  

    showLoginBox = () => {
        this.setState({isLoginOpen:true, isSignupOpen:false})
    }

    showSignupBox = () => {
        this.setState({isSignupOpen:true, isLoginOpen:false})
    }

    render(){
        return(
            <div className="rootContainer">
                <div className='buttonController'>
                    <div
                        className={'controller' + " " + (this.state.isLoginOpen === true ? 'leftSelected' : '')}
                        onClick={this.showLoginBox}>
                        Login
                    </div>
                    <div    
                        className={'controller' + " " + (this.state.isSignupOpen === true ? "rightSelected" : '')}
                        onClick={this.showSignupBox}>
                        Sign Up
                    </div>
                </div>
                <div className='boxContainer'>
                    {this.state.isLoginOpen && <LogIn 
                    setToken={this.props.setToken} 
                    />}
                    {this.state.isSignupOpen && <SignUp 
                    setToken={this.props.setToken}
                    />}
                </div>
            </div>
        )
    }
}