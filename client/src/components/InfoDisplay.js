import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const InfoDisplay = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/info');
            if (!response.ok) {
                throw new Error('Failed to fetch data - Make sure Spring Boot is running on port 8080');
            }
            const data = await response.json();
            setInfo(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div>
            <h2 className="section-header">System Information</h2>

            <Card className="shadow-custom">
                <Card.Body className="p-4">
                    {loading && (
                        <div className="loading-container">
                            <Spinner animation="border" variant="primary" />
                            <p className="loading-text">Loading system information...</p>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="mb-3">
                            <Alert.Heading>Connection Error</Alert.Heading>
                            <p className="mb-0">{error}</p>
                            <hr />
                            <p className="mb-0 small">Make sure your Spring Boot backend is running on http://localhost:8080</p>
                        </Alert>
                    )}

                    {info && !loading && (
                        <Row className="g-4">
                            <Col md={4}>
                                <div className="info-card">
                                    <div className="info-card-icon" style={{backgroundColor: '#e3f2fd', color: '#1976d2'}}>
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        </svg>
                                    </div>
                                    <h5 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Student Service</h5>
                                    <p className="mb-0" style={{color: '#6c757d', fontSize: '0.875rem'}}>{info.student}</p>
                                    <div className="mt-3">
                                        <span className="status-dot status-active"></span>
                                        <small style={{color: '#28a745', fontWeight: '500'}}>Active</small>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="info-card">
                                    <div className="info-card-icon" style={{backgroundColor: '#f3e5f5', color: '#7b1fa2'}}>
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                        </svg>
                                    </div>
                                    <h5 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Course Service</h5>
                                    <p className="mb-0" style={{color: '#6c757d', fontSize: '0.875rem'}}>{info.course}</p>
                                    <div className="mt-3">
                                        <span className="status-dot status-active"></span>
                                        <small style={{color: '#28a745', fontWeight: '500'}}>Active</small>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="info-card">
                                    <div className="info-card-icon" style={{backgroundColor: '#fff3e0', color: '#f57c00'}}>
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                                        </svg>
                                    </div>
                                    <h5 className="mb-2" style={{color: '#2c3e50', fontWeight: '600'}}>Logger Service</h5>
                                    <p className="mb-0" style={{color: '#6c757d', fontSize: '0.875rem'}}>{info.log}</p>
                                    <div className="mt-3">
                                        <span className="status-dot status-active"></span>
                                        <small style={{color: '#28a745', fontWeight: '500'}}>Active</small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            onClick={fetchInfo}
                            disabled={loading}
                            className="px-4"
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Refreshing...
                                </>
                            ) : (
                                'Refresh Information'
                            )}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default InfoDisplay;