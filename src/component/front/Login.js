import React, { Component } from 'react';
import "./Login.css";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createHashHistory } from 'history'


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    
}


    handleLogin(event) {
      this.props.loginUser({username: this.username.value, password:this.password.value});
      event.preventDefault()
    }



  render() {

    return (
      <div  className="login-root">
        <div className="login-header">
            <h1 className="login-headerTitle">Login</h1>
            <h1 className="login-subTitle">登錄・ログイン・Login</h1>
      </div>
      {this.props.auth.isAuthenticated ?

        createHashHistory().goBack()
        //console.log(createHashHistory())
        :

        <Container className="login-container">
        <Form onSubmit={this.handleLogin}>
              <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" name="username"
                      innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" name="password"
                      innerRef={(input) => this.password = input}  />
              </FormGroup>
              {this.props.auth.errMess==="Error 401: Unauthorized"? <p className="login-alert">*The username or password is wrong.</p> : null}
              <Button size="large" value="submit" color="primary">Login</Button>
          </Form>
        </Container>
      }


      </div>
    );
  }
}


  
  export default Login;
