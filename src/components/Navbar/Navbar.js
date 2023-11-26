
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LoginContext } from "../Auth/login/LogInContext";
import { useContext } from "react";
import { When } from "react-if";
import { Link } from "react-router-dom";
import profile from "./profile.png";
// import { UsersContext } from "../User/UsersContext";

import './navbar.scss'

function Navbarr() {
    const state = useContext(LoginContext);
    // const UsersState = useContext(UsersContext);
    // const [isDataFetched, setIsDataFetched] = useState(false);
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         await UsersState.getOneUserDb();
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    
    //     // Check if user is logged in before fetching data
    //     if (state.loggedIn) {
    //       fetchData();
    //     }
    //   }, []);
   
    return (
        <>
            <div className='navvnavv'>

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide" />


                <Navbar collapseOnSelect expand="lg" className="custom-navbar">
                    <Container >
                        <Navbar.Brand href="/" style={{ color: 'white', fontFamily: 'Dancing Script', fontSize: '24px' }}>Simply The Best</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/deals" style={{ color: 'white' }}>Deals</Nav.Link>
                                <Nav.Link href="/claimeddeal" style={{ color: 'white' }}>Claimed Deals</Nav.Link>
                                <Nav.Link href="/users" style={{ color: 'white' }}>Users</Nav.Link>

                                {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>
                            <When condition={!state.loggedIn}>

                                <Nav>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link eventKey={2} href="/login">
                                        Sign up
                                    </Nav.Link>
                                </Nav>
                            </When>
                            <When condition={state.loggedIn} >
                                <Link className="nav-link" onClick={state.logout}>
                                    Signout
                                </Link>
                                <Nav.Link className="nav-link" href="/profile">
                                    <img src={ profile }
                                        alt="" className="img" />
                                </Nav.Link>
                            </When>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

export default Navbarr;