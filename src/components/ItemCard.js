import React, {Component} from 'react'
import APIURL from '../helpers/environment'

export default class ItemCard extends Component{
    constructor(){
        super()
        this.state ={ 
            showNormal:true,
            showUpdate:false
        }   
    }
    
    toggleShow = () => {
        if (this.state.showNormal === true){
            this.setState({
                showNormal: false,
                showUpdate:true
            })
        }else{
        this.setState({
            showNormal:true,
            showUpdate:false
        })
        }
    }

    deleteItem = (e) => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/item/delete/${e.target.id}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => this.props.getUserItems())
    }

    updateItem = (e) => {
        let itemName =  document.getElementById('itemName').value === '' ? document.getElementById('itemName').placeholder: document.getElementById('itemName').value
        let itemPrice = document.getElementById('itemPrice').value === '' ? document.getElementById('itemPrice').placeholder: document.getElementById('itemPrice').value
        let itemDescription = document.getElementById('itemDescription').value === '' ? document.getElementById('itemDescription').placeholder: document.getElementById('itemDescription').value

        let token = localStorage.getItem('token')

        fetch(`${APIURL}/item/update/${e.target.id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                itemName: itemName,
                itemPrice: itemPrice,
                itemDescription: itemDescription
            })
        })
        .then(response => response.json())
        .then(res => this.props.getUserItems())
        .then(res => this.toggleShow())
    }
    
    
    render(){
        return(
            <div>
                <img src={`${APIURL}/` + this.props.item.itemImg} alt='item'/>
                    {this.state.showNormal && <div className='normalView' >
                        <p><strong>{this.props.item.itemName}</strong></p>
                        <p>${this.props.item.itemPrice}</p>
                        <p>{this.props.item.itemDescription}</p>
                        <button onClick={this.toggleShow} id={this.props.item.id} className='updateButton'>Update</button>
                        <button onClick={this.deleteItem} id={this.props.item.id}className='deleteButton'>Delete</button>
                        </div>
                    }
                    {this.state.showUpdate && <div className='updateView'>
                        <input id='itemName' placeholder={this.props.item.itemName}/>
                        <input id='itemPrice' placeholder={this.props.item.itemPrice}/>
                        <textarea id='itemDescription' placeholder={this.props.item.itemDescription}/>
                        <br/>
                        <button id={this.props.item.id} onClick={this.updateItem}>Update</button>
                        <button onClick={this.toggleShow}>Close</button>
                        </div>
                    }
            </div>
        )
    }
}