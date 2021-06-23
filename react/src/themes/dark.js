import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#26292C',
          light: 'rgb(81, 91, 95)',
          dark: 'rgb(26, 35, 39)',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#FFB74D',
          light: 'rgb(255, 197, 112)',
          dark: 'rgb(200, 147, 89)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        titleBar: {
          main: '#555555',
          contrastText: '#ffffff',
        },
        error: {
          main: red.A400,
        },
    },
    typography: {
        fontFamily: 'Verdana',
        fontSize: 15,
        h1: { // incase h1 needs to have a separate fontFamily 
            fontFamily: 'Roboto',
            fontSize: 15,
        }
     },
    shape: {
        borderRadius: 6
    },
});

export default theme;