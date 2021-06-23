import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, red, pink, purple } from '@material-ui/core/colors';

// Normal or default theme
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3388d6',
        },
        secondary: {
            main: '#6442bf',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        },
        titleBar: {
            main: '#eeeeee',
            contrastText: '#222222',
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
    red: {
        backgroundColor: red[500],
        fontSize: '18px',
    },  
    green: {
        backgroundColor: green[500],
        fontSize: '18px',
    },
    blue: {
        backgroundColor: blue[500],
        fontSize: '18px',
    },
    pink: {
        backgroundColor: pink[500],
        fontSize: '18px',
    },      
    purple: {
        backgroundColor: purple[500],
        fontSize: '18px',
    },     
});

export default theme;