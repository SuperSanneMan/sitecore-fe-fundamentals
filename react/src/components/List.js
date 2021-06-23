import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ForwardIcon from '@material-ui/icons/Forward';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import DoneIcon from '@material-ui/icons/Done';
import LoopIcon from '@material-ui/icons/Loop';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

import { blue, green, red, pink, purple } from '@material-ui/core/colors';

import { date } from "../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
}));

function List({ items, variant, deleteButton, saveItem, hasForwardOption }) {
  const [expanded, setExpanded] = useState(items.map(() => false));
  const classes = useStyles();
  
  const handleExpandClick = (id) => {
    const expandedState = expanded.map((expandedItem, index) => {
      return index === id ? !expandedItem : false;
    });
    setExpanded([...expandedState]);
  };
  
  const today = new Date(`${date()}T00:00`);

  const toggleFinished = {
    title: "Toggle Finish",
    onClick: id => e => {
      const testState = items.find((item) => Number(item.id) === Number(id));
      const newState = {...testState, finished: !testState.finished };

      setExpanded(items.map(() => false));
      saveItem(newState);
    }
  } 

  const setEndDateToday = {
    title: "Vandaag mee verder",
    onClick: id => e => {
      const testState = items.find((item) => Number(item.id) === Number(id));
      const newState = {...testState, endDate: `${date()}T18:00` };

      setExpanded(items.map(() => false));
      saveItem(newState);
    }
  } 
  
  const changeSatisfied = (id, satisfied) => {
    const testState = items.find((item) => Number(item.id) === Number(id));
    const reset = testState.satisfied === satisfied ? null : satisfied;
    const newState = {...testState, satisfied: reset };

    saveItem(newState);
  }; 

  const getClassName = (type) => {
    switch(type) {
      case "BE":
        return classes.red
      case "FE":
        return classes.purple
      case "BM":
        return classes.green
      case "OP":
        return classes.blue
      default:
        return classes.pink
    }
  }

  const getVariantCondition = (condition, item) => {
    switch(condition) {
      case "finished":
        return item.finished;
      case "active":
        return !item.finished;
      case "satisfied":
        return item.satisfied;
      case "not-satisfied":
        return item.satisfied === false;
      case "before-today":
        return new Date(item.endDate) < today;
      case "today":
        return new Date(item.endDate) >= today;
      default:
        return console.log("Error");
    }
  }

  return (
    <>
    {
      items.length > 0 && items.map((item, index) => {
        if (getVariantCondition(variant, item)) {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          return (
            <Box key={index} m={1}>
              <Card
                spacing={3} 
                className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={getClassName(item.type)}>
                      { item.type }
                    </Avatar>
                  }
                  action={
                    <>
                      {
                        hasForwardOption && !item.finished && endDate < today ? 
                        <IconButton onClick={setEndDateToday.onClick(item.id)} title={setEndDateToday.title} aria-label={setEndDateToday.title}>
                          <ForwardIcon />
                        </IconButton>
                        :
                        <IconButton onClick={toggleFinished.onClick(item.id)} title={toggleFinished.title} aria-label={toggleFinished.title}>
                        {
                          item.finished ? <DoneIcon /> : startDate > today ? <AddIcon /> : <LoopIcon />
                        }
                        </IconButton>
                      }
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded[index],
                        })}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded[index]}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </>
                  }
                  title={ item.title }
                  subheader={ item.createDate }
                />
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>
                    { item.description }
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => changeSatisfied(item.id, true)} aria-label="add to favorites">
                      {
                        item.satisfied === true ? <SentimentSatisfiedAltIcon style={{ color: green[500] }} /> : <SentimentSatisfiedAltIcon />
                      }
                    </IconButton>
                    <IconButton onClick={() => changeSatisfied(item.id, false)} aria-label="add to favorites">
                      {
                        item.satisfied === false ? <SentimentVeryDissatisfiedIcon style={{ color: red[500] }} /> : <SentimentVeryDissatisfiedIcon />
                      }                          
                    </IconButton>
                    <Button size="small" component={Link} to={`/view-item/${item.id}`} variant="contained" color="primary">View item</Button>
                    <Button size="small" component={Link} to={`/edit-item/${item.id}`} variant="contained" color="secondary">Edit item</Button>
                    <Button size="small" onClick={deleteButton.onClick(item.id)} title={`${deleteButton.title}`} variant="contained">
                      {deleteButton.title}
                    </Button>
                    <Button size="small" onClick={toggleFinished.onClick(item.id)} title={`${toggleFinished.title}`} variant="contained">
                      {toggleFinished.title}
                    </Button>
                  </CardActions>
                </Collapse>
              </Card>
            </Box>
          );
        }
        return null;
      })
    }
    </>
  );
}

export default List;
