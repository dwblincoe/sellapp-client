import React, {Component} from 'react'
import APIURL from '../helpers/environment'

export default class CreateItem extends Component{
    constructor(){
        super()
        this.state = {
            itemName: '',
            itemPrice: '',
            itemDescription: '',
            itemImg: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePicChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            itemImg: e.target.files[0]
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.itemImg)
        let formData = new FormData();
        formData.append("itemName", this.state.itemName)
        formData.append("itemPrice", this.state.itemPrice)
        formData.append("itemDescription", this.state.itemDescription)
        formData.append("itemImg", this.state.itemImg)
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/item/additem`,{
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        })
        .then(res => this.props.getUserItems())
    }

    render(){
        return(
            <div className='createContainer'>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='Item' name='itemName' onChange={this.handleChange}/>
                    <input placeholder='Price' name='itemPrice' onChange={this.handleChange}/>
                    <textarea placeholder='Description' name='itemDescription' onChange={this.handleChange}/>
                    <input type='file'name='itemImg' onChange={this.handlePicChange}/>
                    <button>Add Item</button>
                </form>
            </div>
        )
    }
}