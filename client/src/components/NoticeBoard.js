import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form, Alert, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { fetchNotices, createNotice, deleteNotice } from '../services/api';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', message: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const loadNotices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchNotices();
            setNotices(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadNotices();
    }, [loadNotices]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const trimmedTitle = formData.title.trim();
        const trimmedMessage = formData.message.trim();

        if (!trimmedTitle || !trimmedMessage) {
            setError('Both notice title and message are required.');
            return;
        }

        setSubmitting(true);
        try {
            await createNotice({ title: trimmedTitle, message: trimmedMessage });
            setSuccess('Notice posted successfully.');
            setFormData({ title: '', message: '' });
            await loadNotices();
            setTimeout(() => setSuccess(null), 4000);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete notice: "${title}"?`)) {
            return;
        }

        setDeletingId(id);
        setError(null);
        try {
            await deleteNotice(id);
            setSuccess(`Notice "${title}" deleted successfully.`);
            setNotices((prev) => prev.filter((notice) => notice.id !== id));
            setTimeout(() => setSuccess(null), 4000);
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Just now';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div>
            <h2 className="section-header">Campus Notice Board</h2>

            {/* Post Notice Card */}
            <Card className="shadow-custom mb-4">
                <Card.Header>
                    <h5 className="mb-0">Publish New Notice</h5>
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
                                placeholder="e.g. Campus Maintenance Notice or Exam Timetable"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                maxLength={150}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Notice Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter detailed announcement message..."
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                maxLength={2000}
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Publishing...
                                </>
                            ) : (
                                'Publish Notice'
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Display Notices Feed */}
            <Card className="shadow-custom">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Active Notices</h5>
                    <Badge bg="primary" className="badge-custom">
                        {notices.length} {notices.length === 1 ? 'Notice' : 'Notices'}
                    </Badge>
                </Card.Header>
                <Card.Body className="p-4">
                    {loading && (
                        <div className="loading-container">
                            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                            <p className="loading-text">Loading notices...</p>
                        </div>
                    )}

                    {!loading && notices.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M4 4.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </div>
                            <h5 className="empty-state-text">No notices posted yet</h5>
                            <p style={{ color: '#adb5bd', fontSize: '0.875rem' }}>
                                Publish the first notice above to broadcast an announcement.
                            </p>
                        </div>
                    )}

                    {!loading && notices.length > 0 && (
                        <Row className="g-4">
                            {notices.map((notice) => (
                                <Col md={6} key={notice.id}>
                                    <Card className="h-100 notice-card position-relative">
                                        <Card.Header className="d-flex justify-content-between align-items-start" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="pe-2">
                                                <h6 className="mb-1" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                                    {notice.title}
                                                </h6>
                                                <small style={{ color: '#6c757d' }}>
                                                    {formatDate(notice.createdAt)}
                                                </small>
                                            </div>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="btn-delete"
                                                onClick={() => handleDelete(notice.id, notice.title)}
                                                disabled={deletingId === notice.id}
                                                title="Delete this notice"
                                                aria-label="Delete notice"
                                            >
                                                {deletingId === notice.id ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                )}
                                            </Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text style={{ color: '#495057', whiteSpace: 'pre-wrap' }}>
                                                {notice.message}
                                            </Card.Text>
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