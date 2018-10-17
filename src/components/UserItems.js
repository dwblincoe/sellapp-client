import React, {Component} from 'react'
import ItemCard from './ItemCard'

export default class UserItems extends Component {
    render(){
        return(
        <div>
            <ul className='userItems'>
                {this.props.items.map(item => {
                    return(
                        <li key={item.id}>
                            <ItemCard getUserItems={this.props.getUserItems} item={item}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )}
}