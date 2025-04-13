import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import Home from './pages/Home';
import HighPriority from './pages/HighPriority';
import Completed from './pages/Completed';
import './App.css';
import { Component } from 'react';

// Error Boundary Component
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Error Page Component
function ErrorPage() {
    return (
        <div className="error-page">
            <h2>Something went wrong</h2>
            <p>We're working on fixing this issue.</p>
        </div>
    );
}

// 404 Page Component
function NotFound() {
    return (
        <div className="not-found">
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
        </div>
    );
}

// Layout Component
function Layout() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Landscaping Task Manager</h1>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/" className="nav-link">All Tasks</Link></li>
                        <li><Link to="/high-priority" className="nav-link">High Priority</Link></li>
                        <li><Link to="/completed" className="nav-link">Completed</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                <ErrorBoundary fallback={<ErrorPage />}>
                    <Outlet />
                </ErrorBoundary>
            </main>

            <footer className="app-footer">
                <p>© {new Date().getFullYear()} Landscaping Services</p>
            </footer>
        </div>
    );
}

// Router Configuration
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'high-priority',
                element: <HighPriority />
            },
            {
                path: 'completed',
                element: <Completed />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);

// Main App Component
function App() {
    return <RouterProvider router={router} />;
}

export default App;