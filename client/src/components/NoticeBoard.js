import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Row, Col, Badge, Spinner } from 'react-bootstrap';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: '', message: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchNotices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/notice');
            if (!response.ok) {
                throw new Error('Failed to fetch notices - Make sure Spring Boot is running');
            }
            const data = await response.json();
            setNotices(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.title.trim() || !formData.message.trim()) {
            setError('Both title and message are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/notice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add notice');
            }

            setSuccess('Notice posted successfully');
            setFormData({ title: '', message: '' });
            fetchNotices();

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <h2 className="section-header">Campus Notice Board</h2>

            {/* Add Notice Form */}
            <Card className="shadow-custom mb-4">
                <Card.Header>
                    <h5 className="mb-0">Post New Notice</h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {error && (
                        <Alert variant="danger" dismissible onClose={() => setError(null)}>
                            <strong>Error:</strong> {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
                            {success}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Notice Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter notice title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Notice Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter detailed notice message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Post Notice
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Display Notices */}
            <Card className="shadow-custom">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Notices</h5>
                    <Badge bg="primary" className="badge-custom">{notices.length} Total</Badge>
                </Card.Header>
                <Card.Body className="p-4">
                    {loading && (
                        <div className="loading-container">
                            <Spinner animation="border" variant="primary" style={{width: '3rem', height: '3rem'}} />
                            <p className="loading-text">Loading notices...</p>
                        </div>
                    )}

                    {!loading && notices.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                            <h5 className="empty-state-text">No notices available</h5>
                            <p style={{color: '#adb5bd', fontSize: '0.875rem'}}>Post the first notice to get started</p>
                        </div>
                    )}

                    {!loading && notices.length > 0 && (
                        <Row className="g-4">
                            {notices.map((notice) => (
                                <Col md={6} key={notice.id}>
                                    <Card className="h-100 notice-card">
                                        <Card.Header style={{backgroundColor: '#f8f9fa'}}>
                                            <h6 className="mb-1" style={{color: '#2c3e50', fontWeight: '600'}}>{notice.title}</h6>
                                            <small style={{color: '#6c757d'}}>
                                                {formatDate(notice.createdAt)}
                                            </small>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text style={{color: '#495057'}}>{notice.message}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default NoticeBoard;