import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: null
    }
  }
  
  componentDidMount() {
    fetch(`http://localhost:2999/iten/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ isLoaded: true, data });
      });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header className="Search-header">
          <img src={logo} className="App-logo" style={{ height: 30 }} alt="logo" />
          <span style={{fontSize: 15, paddingLeft: 10, paddingTop:5, flex: 1, color: 'white'}}>Goods Prediction Service</span>
        </header>
        <div style={{ flex: 1 }}>
        {
          this.state.isLoaded ? <Content {...this.state.data} />
          : <div style={{ padding: 20 }}><p>loading...</p></div>
        }</div>
      </div>
    );
  }
}

const Content = ({ ean, itemName, imageUrl,
  amazonAge, duoAge, mlAge, weightedAge }) => <div className="content">
  <table>
    { imageUrl && imageUrl !== 'NO_IMAGE' ? <tr><td colspan="2"><img src={imageUrl} alt="img" style={{height: '200px', display:'block', margin: 'auto'}}/></td></tr> : null }
    <tr>
      <td>Name</td><td>{itemName}</td>
    </tr>
    <tr>
      <td>EAN</td><td>{ean}</td>
    </tr>
    {
      amazonAge ? ( <tr>
        <td>Amazon Age</td><td>{amazonAge} and above</td>
      </tr> ) : null
    }
    {
      duoAge ? (
        <tr>
          <td>Duo Age</td><td>{duoAge} and above</td>
        </tr>
      ) : null
    }
    <tr>
      <td>ML Age</td><td>{mlAge} and above</td>
    </tr>
    <tr>
      <td>Our Prediction</td><td>{weightedAge} and above</td>
    </tr>
  </table>
</div> 

export default Search;
