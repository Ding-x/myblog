import React, { Component } from 'react';
import "./Signup.css";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import {Link} from 'react-router-dom';
import { createHashHistory } from 'history'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          matchPSW:'',
          psw:false,
        };
   
        this.handleSignup = this.handleSignup.bind(this);
        this.handlePSWChange = this.handlePSWChange.bind(this);
        this.handleRePSWChange = this.handleRePSWChange.bind(this);
        this.goBack=this.goBack.bind(this);
    }
    
    
        handlePSWChange(event){
          if(this.password.value.length>0 && this.password.value.length<8  ){
            this.setState({
              psw: false
            });
          }
          else{
            this.setState({
              psw: true
            });
          }
        }
    
        handleRePSWChange(event){
          if(this.repassword.value.length>0 && this.password.value!==this.repassword.value){
            this.setState({
              matchPSW: false
            });
          }
          else{
            this.setState({
              matchPSW: true
            });
          }
    
        }
        
        handleSignup(event) {
            this.props.signupUser({username: this.username.value, password:this.password.value});
            event.preventDefault();
    
        }

        goBack(){
            createHashHistory().push('/Home')
        }


  render() {

    
    return (
      <div  className="signup-root">
        <div className="signup-header">
            <h1 className="signup-headerTitle">Signup</h1>
            <h1 className="signup-subTitle">註冊・サインアップ・Signup</h1>
      </div>
      {this.props.signup.isSignup ?

        <Container className="login-container">
            <h1>Success!</h1>
            <Button onClick={this.goBack}>To home</Button>
            
        </Container>
        :

        <Container className="login-container">
            <Form onSubmit={this.handleSignup}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username"
                        innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={this.handlePSWChange} type="password" id="password" name="password"
                        innerRef={(input) => this.password = input}  />
                    {this.state.psw?null:<Label >The length of password should not be less than 8!</Label>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="repassword">Re-enter Password</Label>
                    <Input onChange={this.handleRePSWChange} type="password" id="repassword" name="repassword"
                        innerRef={(input) => this.repassword = input}  />
                        {this.state.matchPSW?null:<Label >Doesn't match the password!</Label>}
                    
                </FormGroup>
                {this.props.signup.errMess==="Error 500: Internal Server Error"? <p className="login-alert">*Username exists.</p> : null}
                {this.state.matchPSW && this.state.psw? <Button type="submit" value="submit" color="primary">Submit</Button> : <Button disabled type="submit" value="submit" color="primary">Submit</Button> }
              
            </Form>
        </Container>
      }


      </div>
    );
  }
}


  
  export default Signup;
