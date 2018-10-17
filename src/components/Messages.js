import React, {Component} from 'react'
import MessageCard from './MessageCard'
import APIURL from '../helpers/environment'

export default class Messages extends Component{
    constructor(){
        super()
        this.state = {
            messages:[],
            sortedMess: [],
        }
    }
    
    getMessages = () => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(res => {
            let newArr = res.filter((mess, index, self) => index === self.findIndex(t => (
                t.userId === mess.userId && t.itemId === mess.itemId
            )))
            this.setState({messages: newArr})
            console.log(res)
        })
        console.log(this.state.messages)
        this.sortArr()
    }

    sortArr = () => {
       let arr = this.state.messages
       
        let newArr = arr.filter
       this.setState({
           sortedMess: newArr
       })
       
    }

    componentDidMount(){
        this.getMessages()
    }

    render(){
        return(
            <div>
                <h1 style={{background: '#4FBC73', color:'white', textAlign: 'center'}}>Messages</h1>
                {this.state.messages.map(message => {
                    return(
                        <div key={message.id}>
                          <MessageCard getMessages={this.getMessages} setId ={this.props.setId} message={message}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}