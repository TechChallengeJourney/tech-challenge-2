import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/default.theme';

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const BytebankThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme)
  }, [isDarkMode]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
