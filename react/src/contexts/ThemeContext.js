import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import getTheme from '../themes/base'

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext(
  {
    currentTheme: 'normal',
    setTheme: null,
  },
)

const ThemeContext = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [themeName, setThemeName] = useState('normal');

  const theme = getTheme(themeName)

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default ThemeContext