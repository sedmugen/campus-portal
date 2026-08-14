import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        const urlStr = String(url);
        if (urlStr.includes('info')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    student: 'Student Service Active',
                    course: 'Course Service Active',
                    log: 'Audit logging active',
                }),
            });
        }
        if (urlStr.includes('notice')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([
                    {
                        id: 1,
                        title: 'Test Exam Notice',
                        message: 'Exam schedule published.',
                        createdAt: new Date().toISOString(),
                    },
                ]),
            });
        }
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        });
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('renders campus portal navigation and hero title', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Campus Information & Announcement Portal/i })).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getByText(/Student Service/i)).toBeInTheDocument();
    });
});

test('renders system health section and fetches service status', async () => {
    render(<App />);
    expect(screen.getByText(/System Health & Services/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Student Service/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Course Service/i })).toBeInTheDocument();
    });
});

test('renders notice board form and notice card feed', async () => {
    render(<App />);
    expect(screen.getByText(/Campus Notice Board/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Campus Maintenance Notice/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/Test Exam Notice/i)).toBeInTheDocument();
    });
});
