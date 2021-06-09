import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [lightTheme, setLightTheme] = useState(true);

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  }

  const { children } = props;
  return (
      <ThemeContext.Provider value={{ lightTheme, toggleTheme }}>
      {children}
      </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;