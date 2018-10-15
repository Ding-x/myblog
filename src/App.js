import React, { Component } from 'react';
import Main from './component/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
