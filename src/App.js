import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {injectGlobal} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
// import Footer from './components/Footer'


injectGlobal`
body{
  height:100%;
}
`

class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <Header/>
        </Router>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
