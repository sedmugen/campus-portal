import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import InfoDisplay from './components/InfoDisplay';
import NoticeBoard from './components/NoticeBoard';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar className="navbar-custom sticky-top" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" className="d-flex align-items-center">
                        <span className="brand-badge me-2">CP</span>
                        <span>Campus Portal</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#info">System Health</Nav.Link>
                            <Nav.Link href="#notices">Campus Notices</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section text-center py-5">
                <Container>
                    <h1 className="hero-title">Campus Information & Announcement Portal</h1>
                    <p className="hero-subtitle">
                        Real-time campus communications, notice broadcasts, and live service health monitoring.
                    </p>
                </Container>
            </header>

            <Container className="pb-5">
                <section id="info" className="mb-5">
                    <InfoDisplay />
                </section>

                <section id="notices">
                    <NoticeBoard />
                </section>
            </Container>

            <footer className="footer-custom text-center py-4 border-top">
                <Container>
                    <p className="mb-1 text-muted">
                        &copy; {new Date().getFullYear()} Campus Portal. Full-Stack Web Architecture.
                    </p>
                    <small className="text-secondary">
                        Built with Spring Boot 3 &amp; React 19
                    </small>
                </Container>
            </footer>
        </div>
    );
}

export default App;