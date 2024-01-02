import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import MainNavigation from './components/MainNavigation';

export default function App() {
    return (
        <ThemeProvider>
            <MainNavigation />
        </ThemeProvider>
    );
}

