import React, { Component } from 'react';
import './App.css'
import logo from './logo_black.png';

const INITIAL_DATA = [
  {
    "ean": "3417761097441",
    "shortName": "Lerncomputer",
    "itemName": "VTECH 80-109744 - Lerncomputer Schulstart Laptop E",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/51EEzbZNV8L._SL160_.jpg",
    "amazonAge": "6",
    "duoAge": 6,
    "mlAge": "5",
    "weightedAge": 5
  },
  {
    "ean": "4002051695101",
    "shortName": "Strategiespiel",
    "itemName": "Kosmos - Catan - Städte & Ritter, neue Edition Strategiespiel",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/51cQGCp5oAL._SL160_.jpg",
    "amazonAge": "12",
    "duoAge": null,
    "mlAge": "15",
    "weightedAge": 12
  },
  {
    "ean": "5010994830243",
    "shortName": "Spielzeugblaster",
    "itemName": "Hasbro Nerf 98696E35 - N-Strike Elite Retaliator, Spielzeugblaster",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41NoJEB3DAL._SL160_.jpg",
    "amazonAge": "8",
    "duoAge": null,
    "mlAge": "15",
    "weightedAge": 9
  },
  {
    "ean": "0887961310887",
    "shortName": "Doll",
    "itemName": "\"Welcome to Monster High\" Singing Popstar Ari Hauntington Doll, English",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/61ho8junK%2BL._SL160_.jpg",
    "amazonAge": "6",
    "duoAge": null,
    "mlAge": "2",
    "weightedAge": 5
  },
  {
    "ean": "6942138940077",
    "shortName": "Schwimmtier",
    "itemName": "Bestway Schwimmtier Shark, 183x102 cm",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41-AmRTcgjL._SL160_.jpg",
    "amazonAge": "3",
    "duoAge": null,
    "mlAge": "3",
    "weightedAge": 3
  },
  {
    "ean": "4950344578283",
    "shortName": "Spielzeugauto",
    "itemName": "Tamiya 300057828 - 1:10 RC XB Fast Attack Vehicle 2011",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41EC0YKTfDL._SL160_.jpg",
    "amazonAge": "14",
    "duoAge": 14,
    "mlAge": "16",
    "weightedAge": 14
  },
  {
    "ean": "8003558129973",
    "shortName": "Kinderkostüm",
    "itemName": "Widmann 12997 - Kinderkostüm Traumfee, Kleid mit Flügel, Größe 140",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41MQP2sL6sL._SL160_.jpg",
    "amazonAge": "8",
    "duoAge": null,
    "mlAge": "16",
    "weightedAge": 5 // originally 9
  },
  {
    "ean": "4007486301610",
    "shortName": "Spielzeugauto",
    "itemName": "Carrera 20030161 - Digital 132 GT Power AGE 8+",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/511vRTpiljL._SL160_.jpg",
    "amazonAge": "8",
    "duoAge": null,
    "mlAge": "8",
    "weightedAge": 8
  },
  {
    "ean": "8003558013852",
    "shortName": "Kostüm",
    "itemName": "Widmann 01385 Zombieskelett, Kostüm, 120 cm",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41hRd8hQesL._SL160_.jpg",
    "amazonAge": "16",
    "duoAge": null,
    "mlAge": "16",
    "weightedAge": 16
  },
  {
    "ean": "4009803239712",
    "shortName": "Quadrocopter",
    "itemName": "Revell Control 23971 - Mini Quadrocopter Nano, farblich sortiert",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/51ZCyHpbgxL._SL160_.jpg",
    "amazonAge": "8",
    "duoAge": 3,
    "mlAge": "16",
    "weightedAge": 6
  },
  {
    "ean": "4005556125722",
    "shortName": "Puzzle",
    "itemName": "Ravensburger 12572 - Fachwerkhaus - 3D Puzzle - Bauwerke, 216 Teile",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/51MsbqCNo0L._SL160_.jpg",
    "amazonAge": "10",
    "duoAge": null,
    "mlAge": "9",
    "weightedAge": 9
  },
  {
    "ean": "4008789092625",
    "shortName": "Kalender",
    "itemName": "Playmobil 9262 - Adventskalender Reiterhof",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/61JykegHrfL._SL160_.jpg",
    "amazonAge": "4",
    "duoAge": 10,
    "mlAge": "10",
    "weightedAge": 7
  },
  {
    "ean": "4005556003648",
    "shortName": "Spielfigur",
    "itemName": "Ravensburger 00364 - Tiptoi Spielfigur: Schimpanse",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/51zi3069AGL._SL160_.jpg",
    "amazonAge": "4",
    "duoAge": null,
    "mlAge": "16",
    "weightedAge": 4 // originally 5
  },
  {
    "ean": "4001949003301",
    "shortName": "Backschüsselset",
    "itemName": "330 - Heless - Backschüsselset Ø 20 cm, im Netz",
    "imageUrl": "https://images-eu.ssl-images-amazon.com/images/I/41NHA382SQL._SL160_.jpg",
    "amazonAge": "3",
    "duoAge": 3,
    "mlAge": "16",
    "weightedAge": 4
  }
].map(d => ({ ...d, ageGuess: null, isGuessed: false, }));

const boxStyle = { display: 'flex', width: 360, flex: 1, margin: 'auto',
  marginBottom: 20, padding: 10, border: '1px solid black' };

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: INITIAL_DATA
    }
  }

  handleEnterAge = (ean, age) => {
    this.setState((prevState) => {
      return {
        data: prevState.data.map(d => {
          if (d.ean === ean) {
            return { ...d, ageGuess: Number(age) }
          }
          return d;
        })
      }
    });
  }

  handleGuessAge = (ean) => {
    this.setState((prevState) => {
      return {
        data: prevState.data.map(d => {
          if (d.ean === ean) {
            return { ...d, isGuessed: true }
          }
          return d;
        })
      }
    });
  }

  handleResetGuessAge = (ean) => {
    this.setState((prevState) => {
      return {
        data: prevState.data.map(d => {
          if (d.ean === ean) {
            return { ...d, isGuessed: false, ageGuess: null }
          }
          return d;
        })
      }
    });
  }

  render() {
    console.log(this.state)
    return <div style={{ textAlign: 'center' }}>
      <img src={logo} className="App-logo" alt="logo" style={{ height: 50 }}/>   
      <h1>What's My Age?</h1>
      <p>Guess the age of the item correctly to get a chance to win a prize!</p>
      <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column' }}>
      {
        this.state.data.map(d => <div style={boxStyle} key={d.imageUrl}>
          <img src={d.imageUrl} alt="img"/>
          { !d.isGuessed ? (
            <div style={{ padding: 40 }}>
              <div style={{ marginBottom: 10 }}>{ d.shortName }</div>
              <input type="number" style={{ marginBottom: 10 }} 
                onChange={e => this.handleEnterAge(d.ean, e.target.value)}
              />
              <br />
              <button onClick={(e) => this.handleGuessAge(d.ean)}>Guess!</button>
            </div>
          ) : <div style={{ padding: 40 }}>
            <div>You guessed { d.ageGuess }</div>
            { d.ageGuess === d.weightedAge ? 
              <span role="img">✅ You got it!</span> : <span role="img">❌ Answer: {d.weightedAge}</span>}
            <button style={{ marginTop: 10 }} onClick={(e) => this.handleResetGuessAge(d.ean)}>Back</button>
          </div> }
        </div>)
      }
      </div>
    </div>
  }
}

export default Game;