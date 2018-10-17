import React, {Component}  from 'react'
import Item from './Item'

export default class Home extends Component{
    constructor(){
        super()
        this.state = {
            items: [],
            showAllItems:true,
            showOneItem:false,
            itemId: ''
        }
    }


    componentDidMount(){
        this.allItems()
    }

    allItems = () => {
        fetch('http://localhost:3001/item', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(items => {
                console.log(items)
                this.setState({items: items})
            })
            .catch(err => console.log(err))
    }

    homeItems = () => {
        return(
            <div className='homeContainer'>
                <ul>
                    {this.state.items.map(item => {
                        return(
                            <li key={item.id} className='itemContainer'>
                            <img src={'http://localhost:3001/' + item.itemImg} alt='item'/>
                            <button id={item.id} onClick={this.toggleShow}>More Info!</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    toggleShow = (e) => {
        console.log(e.target.id)
        if(this.state.showAllItems === true){
            this.setState({
                showAllItems:false,
                showOneItem:true,
                itemId: e.target.id
            })
        } else {
            this.setState({
                showAllItems:true,
                showOneItem:false
            })
        }
        console.log(this.state.itemId)
    }
    
    render(){
        return(
            <div>
                {this.state.showAllItems && this.homeItems()}
                {this.state.showOneItem && <Item toggleShow={this.toggleShow} itemId={this.state.itemId}/>}
            </div>
        )
    }
}