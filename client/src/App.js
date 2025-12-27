import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import InfoDisplay from './components/InfoDisplay';
import NoticeBoard from './components/NoticeBoard';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar className="navbar-custom" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Campus Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#info">System Info</Nav.Link>
                            <Nav.Link href="#notices">Notices</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-5">
                <h1 className="text-center mb-5">Welcome to Campus Portal</h1>

                {/* Task 3: Info Display Component */}
                <section id="info" className="mb-5">
                    <InfoDisplay />
                </section>

                {/* Task 5: Notice Board Component */}
                <section id="notices">
                    <NoticeBoard />
                </section>
            </Container>

            <footer className="text-center mt-5 mb-3">
                <p>&copy; 2025 Campus Portal - Web Engineering Assignment</p>
            </footer>
        </div>
    );
}

export default App;