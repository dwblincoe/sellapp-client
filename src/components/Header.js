import React, {Component} from 'react'
import {FaUser, FaComments} from 'react-icons/fa' 
import {Navbar} from 'reactstrap';
import {Route, Link, Switch} from 'react-router-dom'
import Home from './Home'
import Messages from './Messages'
import Protected from './Protected'
import Trash from '../assets/trash.png'


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
          sessionToken: '',
          userId: '',
          itemId: ''
        }
      }

      setId = (e) => {
         console.log(e.target.id) 
         console.log(e.target.name) 
         this.setState({
                itemId: e.target.id ,
                userId: e.target.name
          })
      }
    
      componentWillMount(){
        const token = localStorage.getItem('token')
        const name = localStorage.getItem('name')
        console.log(token)
        console.log(name)
        if(token && !this.state.sessionToken){
          this.setState({ sessionToken: token, fName: name  })
        }
      }
    
      setSessionState = (token) => {
        localStorage.setItem('token', token);
        this.setState({ sessionToken: token})
        console.log(this.state.sessionToken)
      }
    
    render(){
    return(
        <div className='fullContainer'>
            <Navbar style={{background: '#4FBC73', width:'100%'}} light expand="md">
                <Link style={{color: 'white', fontSize:'20px', textDecoration:'none'}} to='/home'><img src={Trash} style={{width:'100%'}}/></Link>
                <Link style={{paddingRight: '20px'}}className='ml-auto' to='/messages'>
                    <FaComments
                        color='white'
                        size='30px'
                        left-margin='100px'
                        className='icon'
                    />
                    <div className='word'>Messages</div>
                </Link>
                <Link to='/protected'>
                    <FaUser
                        color='white'
                        size='30px'
                        className='icon'
                    />
                    <div className='word'>Profile</div>
                </Link>
            </Navbar> 
            <Switch>
                <Route exact path='/home'><Home /></Route>
                <Route exact path='/'><Home setId={this.setId}/></Route>
                <Route exact path='/messages'><Messages setId={this.setId}/></Route>
                <Route exact path='/protected'>
                    <Protected 
                    setToken={this.setSessionState} 
                    sessionToken={this.state.sessionToken}
                    />
                </Route>
            </Switch>
        </div>

    )}
}

export default Header