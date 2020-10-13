import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Episode from './EpisodeComponent';
import Anime from './AnimeComponent';

class Main extends Component {

  render() {
    return (
      <div>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/episode/:slug" component={Episode} />
            <Route path="/anime/:slug" component={Anime} />
          </Switch>
        <Footer />
      </div>
      
    )
  }
}

export default withRouter(Main);
