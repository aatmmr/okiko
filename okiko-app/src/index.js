import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Search from './Search';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/item/:id" component={Search} />
    </div>
  </Router>, 
document.getElementById('root'));

registerServiceWorker();
