import Layout from './Layout';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import AccessibilityPage from './pages/AccessibilityPage';

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'privacy', element: <PrivacyPage /> },
            { path: 'accessibility', element: <AccessibilityPage /> },
        ],
    },
];
