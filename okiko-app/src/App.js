import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './poppins.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ean: null
    }
  }

  handleEanChange = (e) => {
    this.setState({
      ean: e.target.value
    });
    fetch('http://localhost:2999/iten/12345')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Poppins - Goods Prediction Service</h1>
        </header>
        <div className="App-intro">
          <form onSubmit={(e) => { 
            e.preventDefault();
            console.log(this.state.ean);
          }}>
            <input type="text" placeholder="Search by EAN" style={{ width: 200, fontSize: 20, padding: 5 }} onChange={this.handleEanChange}/>
            <br/>
            <Link to={`/item/${this.state.ean}`}>
              <input type="submit" value="Search" style={{ marginTop: 20, fontSize: 30, padding: 5 }}/>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
