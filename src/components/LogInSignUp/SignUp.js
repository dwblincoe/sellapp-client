import React, {Component} from 'react'
import APIURL from '../../helpers/environment'     

export default class SignUp extends Component{
    constructor(){
        super()
        this.state ={
            fName: '',
            lName: '',
            email: '',
            pass: '',
            confirmPass: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    handleSubmit = (e) => {
        let name = this.state.fName
        localStorage.setItem('name', name)
        e.preventDefault()
        if(this.state.pass === this.state.confirmPass){
            fetch(`${APIURL}/user/signup`,{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.state.fName,
                    lastName: this.state.lName,
                    email: this.state.email,
                    password: this.state.pass
                })
            })
                .then(response => response.json())
                .then(user => {
                    this.props.setToken(user.sessionToken);
                    
                    let token = user.sessionToken;
                    localStorage.setItem('sessionToken', token)
                })
        }else{
            alert('Passwords didn\'t match.')
        }
    }            
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="formContainer">
                <h1>Sign Up</h1>
                <input 
                    name='fName' 
                    onChange={this.handleChange}
                    placeholder='First Name'
                />
                <input
                    name='lName' 
                    onChange={this.handleChange}
                    placeholder='Last Name'
                />
                <input 
                    name='email' 
                    onChange={this.handleChange}
                    placeholder='Email'
                />
                <input 
                    type='password'
                    name='pass' 
                    onChange={this.handleChange} 
                    placeholder='Password'
                    minLength = '5' required
                />
                <input
                    type='password'
                    name='confirmPass' 
                    onChange={this.handleChange}
                    placeholder='Password Confirm'
                />
                <button>Register</button>
            </form>
        )
    }
}