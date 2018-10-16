import React, { Component } from 'react';
import Main from './component/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


class App extends Component {
  render() {
    const store = ConfigureStore();
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
        <BrowserRouter>
        <Main/>
        </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
