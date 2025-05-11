import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
createRoot(rootElement).render(<App />); 