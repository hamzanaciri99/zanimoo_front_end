import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Recents from './RecentsComponent';
import Episode from './EpisodeComponent';
import Anime from './AnimeComponent';

class Main extends Component {

  render() {
    return (
      <div className="container">
        <Header />
          <Switch>
            <Route path="/recents" component={() => <Recents recents={this.props.recents} />} />
            <Route path="/episode/:slug" component={Episode} />
            <Route path="/anime/:slug" component={Anime} />
          </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Main);
