import React, { Component } from 'react';
import Main from './component/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import {HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


class App extends Component {
  render() {
    const store = ConfigureStore();
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
        <HashRouter>
        <Main/>
        </HashRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
