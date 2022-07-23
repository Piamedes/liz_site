import React  from 'react';
import Navbar from 'react-bootstrap/Navbar';

class NavbarRenderer extends React.Component {
  render(){

    return( 
      <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>
            <a href="#brand">{''}</a>
          </Navbar.Brand>
      </Navbar>
    )
  }
}

/*
        <Navbar.Collapse>
    =
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.props.handleModalShowCallback('FAQ',<Image src={require('./castle.png')} responsive/>)}>
              FAQ
            </NavItem>
            <NavItem eventKey={2} href="#">
              Help
            </NavItem>
          </Nav>
        </Navbar.Collapse>
*/

export default NavbarRenderer