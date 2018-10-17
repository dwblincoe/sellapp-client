import React from 'react'
import styled from 'styled-components'

const Foot = styled.footer`
    height:30px;
    width:100%;
    background:#4FBC73;
    text-align:center;
    bottom:0;
    position:relative
`
const Copy = styled.p`
    color:white;
    text-align:center
`

const Footer =() => {
    return(
        <Foot>
            <Copy style={{"marginBottom": "0"}}>&copy; Drew Blincoe 2018</Copy>
        </Foot>
    )
}

export default Footer