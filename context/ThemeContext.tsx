import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeContextProps {
    children: ReactNode;
}

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const value: ThemeContextType = { isDarkMode, toggleDarkMode };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
