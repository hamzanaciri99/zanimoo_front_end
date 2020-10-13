import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './stylesheets/App.css';
import './stylesheets/all.min.css';
import Main from './components/MainComponent';
import reducers from './redux/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

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
