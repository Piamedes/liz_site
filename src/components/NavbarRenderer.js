import React  from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

class NavbarRenderer extends React.Component {
	render(){
		return(
		    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		      <Container>
		        <Navbar.Brand href="#home"></Navbar.Brand>
		        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		        <Navbar.Collapse id="responsive-navbar-nav">
		          <Nav className="me-auto"/>
		          <Nav>
		            <Nav.Link eventKey={1} onClick={this.props.showHintsCallback}>Hints</Nav.Link>
		            <Nav.Link eventKey={2} onClick={this.props.showHelpCallback}>Help</Nav.Link>
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
		)
	};
};

export default NavbarRenderer

			            // <Nav.Link href="#features">Features</Nav.Link>
			            // <Nav.Link href="#pricing">Pricing</Nav.Link>
			            // <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
			            //   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
			            //   <NavDropdown.Item href="#action/3.2">
			            //     Another action
			            //   </NavDropdown.Item>
			            //   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
			            //   <NavDropdown.Divider />
			            //   <NavDropdown.Item href="#action/3.4">
			            //     Separated link
			            //   </NavDropdown.Item>
			            // </NavDropdown>

//   render(){

//     return( 

// 	    <Navbar bg="dark" variant="dark" expand="lg">
// 	        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
// 	        <Navbar.Toggle />
// 	        <Navbar.Collapse className="justify-content-end">
// 	          <Navbar.Text>
	            
// 	          </Navbar.Text>
// 	        </Navbar.Collapse>
// 	    </Navbar>

//       <Navbar bg="dark" variant="dark" expand="lg">
//           <Navbar.Brand>
//             <a href="#brand">{''}</a>
//           </Navbar.Brand>
//           <Navbar.Nav pullRight>
//             <NavItem eventKey={1} onClick={this.props.showHintsCallback}>
//               FAQ
//             </NavItem>
//           </Nav>
//       </Navbar>
//     )
//   }
// }

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