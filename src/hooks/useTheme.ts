import { useState } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cryptoTrackerTheme');
    return saved === 'dark';
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('cryptoTrackerTheme', newTheme ? 'dark' : 'light');
  };

  return { isDarkMode, toggleTheme };
};
