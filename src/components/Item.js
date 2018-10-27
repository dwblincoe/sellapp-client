import React, {Component} from 'react'
import {FaWindowClose} from 'react-icons/fa'
import APIURL from '../helpers/environment'
import { get } from 'https';

export default class Item extends Component{
    constructor(){
        super()
        this.state = {
            itemName: '',
            itemImg: '',
            itemPrice: '',
            itemDescription: '',
            userId: '',
            message: ''
        }
    }

    componentDidMount(){
        this.getOneItem()
    }

    getOneItem = () => {
        let itemId = this.props.itemId
        let token = localStorage.getItem('token')

        fetch(`${APIURL}/item/${itemId}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        .then(res => res.json())
        .then(item => {
            this.setState({
                itemId: item.id,
                itemName: item.itemName,
                itemImg: item.itemImg,
                itemPrice: item.itemPrice,
                itemDescription: item.itemDescription,
                userId: item.userId
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        // console.log(localStorage.getItem('token'))
        e.preventDefault()
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/messages/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                recieverId: this.state.userId,
                message: this.state.message,
                itemId:this.state.itemId
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        this.props.toggleShow()
    }

    render(){
        return(
            <div style={{height:'100%'}}>
                <button className='closeButton' onClick={this.props.toggleShow}>
                <FaWindowClose 
                color='#DD1500'
                />
                </button>
                <div className='oneItem'>
                    <img src={`${APIURL}/` + this.state.itemImg} alt='item'/>
                    <div className='itemInfo'>
                        {/* <div>{this.state.}</div> */}
                        <h1>{this.state.itemName}</h1>
                        <h3>{`$${this.state.itemPrice}`}</h3>
                        <p>{this.state.itemDescription}</p>
                        <form onSubmit={this.handleSubmit}>
                            <textarea name='message' onChange={this.handleChange} placeholder='Send owner a message'/>
                            <button>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>            
        )
    }
}