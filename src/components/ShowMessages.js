import React from 'react'

const ShowMessages = (props) => {
    let userId = localStorage.getItem('userId')
    console.log(userId)
    return(
        <div>
            {userId == props.message.senderId ? <li className='ownerReplies'>{props.message.message}</li> : <li className='interestReplies'>{props.message.message}</li>}
        </div>
        
    )
}

export default ShowMessages