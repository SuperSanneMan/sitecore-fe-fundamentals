import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import ToggleTheme from '../components/ToggleTheme';
import { CustomThemeContext } from '../contexts/ThemeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation({ routes }) {
  const { currentTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark');

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    home,
    retro,
    dashboard,
    createItem
  } = routes;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

  return (
    <div className={`${classes.root}${isDark ? " darkmode" : ""}`}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="menu-appbar" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Personal Sprint Assistant
          </Typography>
          <ToggleTheme />
          <Box m={1}>
            <Button component={Link} to={home} variant="contained" color="secondary">Today</Button>
          </Box>
          <Box m={1}>
            <Button component={Link} to={dashboard} variant="contained" color="primary">Dashboard</Button>
          </Box>
          <div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={Link} to={createItem} onClick={handleClose}>Create item</MenuItem>
              <MenuItem component={Link} to={dashboard} onClick={handleClose}>Dashboard</MenuItem>
              <MenuItem component={Link} to={retro} onClick={handleClose}>Retrospective</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
