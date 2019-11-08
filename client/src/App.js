import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/PageComponents/Navbar';
import Footer from './components/PageComponents/Footer'
import about from './components/Pages/about';
import Browse from './components/Pages/Browse';
import explore from './components/Pages/explore.jsx';
import login from './components/Pages/login';
import register from './components/Pages/register';
import mapContainer from './components/Pages/mapContainer.jsx';
import solution from './components/Pages/solution.jsx';
import addSolution from './components/Pages/addSolution';
import dashboard from './components/Pages/dashboard';
import user_profile_page from './components/Pages/user_profile_page';
import notifications_page from './components/Pages/notifications';
import tempAdminPage from './components/Pages/tempAdminPage';


import store from './store';
import { loadUser } from './actions/userActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/browse' component={Browse} />
          <Route path='/about' component={about} />
          <Route path='/login' component={login} />
          <Route path='/register' component={register} />
          <Route exact path='/' component={explore}/>
          <Route path='/map' component={mapContainer} />
          <Route path='/solution/add' component={addSolution} />
          <Route path='/solution/:id' component={solution} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route path='/profile' component={user_profile_page} />
          <Route path='/notifications' component={notifications_page} />
          <Route path='/tempadminpage' component={tempAdminPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
