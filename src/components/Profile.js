import React, {Component} from 'react'
import Protected from './Protected'
import {Link, Route} from 'react-router-dom'
import CreateItem from './CreateItem'
import UserItems from './UserItems'
import APIURL from '../helpers/environment'

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileItems: [],
            show: false,
            showName: true,
            showName2: false
        }
    }
    
    logout = () => {
        this.props.setToken('')
        localStorage.clear()
        
        return(
            <Protected/>
        )
    }

    toggle = () => {
        if(this.state.show === false){
            this.setState({
                show:true,
                showName:false,
                showName2:true
            })
        } else {
            this.setState({
                show:false,
                showName:true,
                showName2:false
            })
        }
    }

    componentDidMount(){
        this.getUserItems()
    }
        
    getUserItems = () => {
    let token = localStorage.getItem('token')
        fetch(`${APIURL}/item/useritems`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(items => {
                console.log(typeof(profileItems))
                this.setState({ profileItems: items })
                console.log(this.state.profileItems)
            })
            .catch(err => console.log(err))
        }
    
    render(){
        return(
            <div className='profileContainer'>
                <div className='profileContainer2'>
                    <h1>Welcome {localStorage.getItem('name')}</h1>
                    <Link className='createButton' onClick = {this.toggle} to='/createitem'>{this.state.showName && 'Sell Your Junk'}{this.state.showName2 && 'Close'}</Link>
                    <Route exact path='/createitem'>{this.state.show && <CreateItem getUserItems={this.getUserItems}/>}</Route>
                    <UserItems 
                    items={this.state.profileItems} 
                    getUserItems={this.getUserItems}
                    setId={this.props.setId}
                    itemId={this.props.itemId}
                    />
                    <button onClick={this.logout} className='logoutButton'>Log Out</button>
                </div>
            </div>
            
        )
    }
}