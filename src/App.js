import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import './App.css';
import Main from './components/MainComponent';
import { recentEpisodes } from './redux/reducers/recents';

const store = createStore(combineReducers({
  recentEpisodes: recentEpisodes,
}));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
