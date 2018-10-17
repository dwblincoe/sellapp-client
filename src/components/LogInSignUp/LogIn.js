import React, {Component} from 'react'
import APIURL from '../../helpers/environment'

export default class LogIn extends Component{
    constructor(){
        super()
        this.state ={
            email: '',
            pass: ''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${APIURL}/user/login`, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.pass
            })
        })
        .then(response => response.json())
        .then(user => {
            let userId = user.user.id
            localStorage.setItem('userId', userId)
            let name = user.user.firstName
            localStorage.setItem('name', name)
            this.props.setToken(user.sessionToken)
            let token = user.sessionToken
            localStorage.setItem('Session Token', token)
        })
    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className='formContainer'>
                    <h1>Log In</h1>
                    <input name='email' onChange={this.handleChange} placeholder='Email'/>
                    <input type='password' name='pass' onChange={this.handleChange} placeholder='Password'/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}