# Campus Portal — Frontend Client

The frontend client for **Campus Portal**, built with **React 19**, **React-Bootstrap**, and custom CSS.

---

## Features

- **Real-Time Notice Feed**: Interactive card feed with dynamic date formatting and live deletion capabilities.
- **Notice Publishing**: Form validation with real-time feedback alerts.
- **Service Health Dashboard**: Monitors backend microservice statuses with one-click refresh.
- **Responsive Layout**: Fluid breakpoints optimized for mobile, tablet, and desktop viewports.

---

## Quickstart

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Run

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

Runs on [http://localhost:3000](http://localhost:3000).

### Environment Configuration

Create a `.env` file in `client/` if connecting to a custom backend host:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Available Scripts

- `npm start`: Starts development dev server on port 3000.
- `npm run build`: Bundles production assets into `build/`.
- `npm test`: Runs interactive test suite.
