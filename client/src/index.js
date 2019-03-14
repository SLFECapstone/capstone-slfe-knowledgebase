import React from 'react';
import { render }from 'react-dom';
import './styles/main.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import explore from './components/Pages/explore.jsx';
import about from './components/Pages/about';
import result from './components/Pages/result.jsx';
import solution from './components/Pages/exampleSolution.jsx';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import DataTest from './components/Pages/DataTest';
//import registerServiceWorker from './registerServiceWorker';

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={explore}/>
      <Route path='/about' component={about} />
      <Route path='/result' component={result} />
      <Route path='/solution' component={solution} />
      <Provider store={store}>
        <Route path='/test' component={DataTest} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'));
//registerServiceWorker();
