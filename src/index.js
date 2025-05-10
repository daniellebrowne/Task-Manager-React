import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Completed from './pages/Completed';
import HighPriority from './pages/HighPriority';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "completed",
                element: <Completed />
            },
            {
                path: "high-priority",
                element: <HighPriority />
            }
        ]
    }
]);

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

reportWebVitals();