import React,{Component} from 'react';
import { Nav, NavItem,  NavLink,Button } from 'reactstrap';
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signupModal:false,
      matchPSW:'',
      psw:false,
      signupError:false
    };

    this.handleLogout = this.handleLogout.bind(this);
}

    handleLogout(event) {
      this.props.logoutUser();
      event.preventDefault()
    }

      render() {
        if(this.props.isDashboard<0)
          return (
            <div className='header-root'>
                <div className='nav-left'>
                <Nav className='nav-bar'>
                  <NavItem >
                    <NavLink className='nav-item' href='#Home' >Home</NavLink>
                  </NavItem>
                  <NavItem >
                    <NavLink className='nav-item' href='#Work' >Works</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='nav-item' href='#Article' >Articles</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='nav-item' href='#Music' >Musics</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='nav-item' href='#About' >About</NavLink>
                  </NavItem>
                </Nav>
                </div>
              
                { !this.props.auth.isAuthenticated ?
                    <div  className='nav-right'>
                      {/* <Button  className='login' href='#Signup' color="success">Signup</Button> */}
                      <Button outline color="secondary"  className='login' href='#Login' >Login</Button>
                    </div>
                      :
                      <div className='nav-right'>
                        <Button outline color="secondary"  className='logout' onClick={this.handleLogout} >Logout</Button>
                        <Button outline color="secondary"  className='logout' href='#Dashboard/Home'>{this.props.auth.user.username}</Button>
                      </div>
                  }
             
            </div>
          );
        else
          return(
            <div></div>
          )
      }
  

}



export default Header;
