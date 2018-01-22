import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

const dummyData = {
  title: 'LEGO Minifigures 8804 - Sammelfiguren Serie 4',
  image: 'http://www.duo-shop.de/de-DE/Document/Image/67d0669a-e920-4e4c-93d5-3368501def9e/375/375/PLAYMOBIL-Rockstar',
  age: '6',
  category: 'Toys',
  shopLink: 'https://www.duo-shop.de/de-DE/Details/Original-Rainbow-Loom-Gummibaender-Mix-Tarnfarben/193718'
}

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
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <header className="Search-header">
          <img src={logo} style={{
            animation: 'App-logo-spin infinite 20s linear', height: '30px', display: 'inline', float: 'left'}} alt='logo'/>
          <div style={{fontSize: 20, padding: 5}}>Poppins - Goods Prediction Service</div>
        </header>
        {
          this.state.isLoaded ? <Content ean={this.state.data.ean} />
          : <div>loading...</div>
        }
      </div>
    );
  }
}

const Content = ({ ean }) => <div className="content">
  <table>
    { dummyData.image ? <tr><td colspan="2"><img src={dummyData.image} alt="img" style={{height: '200px', display:'block', margin: 'auto'}}/></td></tr> : null }
    <tr>
      <td>Name</td><td>{dummyData.title}</td>
    </tr>
    <tr>
      <td>EAN</td><td>{ean}</td>
    </tr>
    <tr>
      <td>Category</td><td>{dummyData.category}</td>
    </tr>
    <tr>
      <td>Age Classification</td><td>{dummyData.age} and above</td>
    </tr>
    <tr>
      <td>Link</td><td><a href={dummyData.shopLink}>Go to item page</a></td>
    </tr>
  </table>
</div> 

export default Search;
