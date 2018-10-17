import React, {Component} from 'react'
import ShowMessages from './ShowMessages'
import { FaTrash} from 'react-icons/fa';
import APIURL from '../helpers/environment'

export default class MessageCard extends Component{
    constructor(){
        super()
        this.state = {
            recieverName: localStorage.getItem('name'),
            senderName: '',
            itemImg: '',
            itemId: '',
            recieverId: '',
            message:'',
            messageChain:[],
            regShow:true,
            replyShow:false
        }
    }

    getSender = () => {
        let getOne = this.props.message.senderId
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/user/${getOne}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(user => {
            this.setState({
                senderName: user.firstName,
                recieverId: user.id
            })
        })
    }

    getImage = () => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/item/${this.props.message.itemId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(item => this.setState({itemImg: item.itemImg, itemId: item.id}))
    }

    componentDidMount(){
        this.getSender()
        this.getImage()
    }

    toggleReply = () => {
        if(this.state.regShow === true){
            this.setState({
                regShow: false,
                replyShow: true
            })
        } else {
            this.setState({
                regShow: true,
                replyShow: false
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/messages/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                recieverId: this.state.recieverId,
                message: this.state.message,
                itemId:this.state.itemId
            })
        })
        .then(res => res.json())
        .then(res => this.toggleReply())
    }

    getMessageChain = (e) => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/messages/${e.target.id}/${e.target.name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res=>res.json())
        .then(data=>this.setState({messageChain:data}))

        this.toggleReply()
    }

    deleteMessageChain = (e) => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/messages/${e.target.id}/${e.target.name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => this.props.getMessages())
    }
    
    render(){
        return(
            <div>
                <div className='messageContainer'>
                    <div className='messagePic'>
                        <img src={`${APIURL}/${this.state.itemImg}`}/>
                    </div>
                    {this.state.regShow && 
                    <div className='messageSender'>
                        <p><strong>{this.state.senderName}</strong></p>
                        <button onClick={this.getMessageChain} id={this.props.message.itemId} name={this.props.message.senderId}>See Messages</button>
                        <button onClick={this.deleteMessageChain} id={this.props.message.itemId} name=      {this.props.message.senderId} className='trash'style={{background:'transparent', border:'none'}}>
                            <FaTrash
                                color='#DD1500'
                            />
                        </button>
                    </div>}
                    {this.state.replyShow && 
                    <div className='messageSender'>
                        {this.state.messageChain.map(message => {
                            return(
                                <ul style={{listStyle: 'none', padding:'0', display:'flex', marginTop:'5px'}} key={message.id}>
                                    <ShowMessages message={message}/>
                                </ul>
                            )
                        })}
                        <form onSubmit={this.handleSubmit}>
                            <textarea onChange={this.handleChange} name='message'/>
                            <button onClick={this.reply}>Reply</button>
                            <button onClick={this.toggleReply}>Close</button>
                        </form>
                    </div>}
                </div>
            </div>
        )
    }
}