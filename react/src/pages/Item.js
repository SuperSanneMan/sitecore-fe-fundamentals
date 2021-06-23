import { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useLocation, useParams } from "react-router-dom";
import { CustomThemeContext } from '../contexts/ThemeContext';

import { getCategories, getItemById } from "../services/getService";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const getDateTime = () => {
  const now = new Date();
  const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");

  return date.substring(0, date.length-3);
}

const getDayEndDateTime = () => {
  const endOfWorkDay = "18:00";
  const res = getDateTime().split("T");
  return `${res[0]}T${endOfWorkDay}`;
}

const initialState = (sprint) => {
  return {  
    id: "",
    title: "",
    description: "",
    type: "",
    link: "",
    value: 6,
    sprintId: sprint,
    startDate: getDateTime(),
    endDate: getDayEndDateTime(),
    createDate: "",
    upDate: "",
    satisfied: null,
  }
}

const options = [
  {
    value: true,
    label: 'True',
  },
  {
    value: false,
    label: 'False',
  },
];

const happines = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },        
];

function Item({ settings, sprintsData, newItem, saveItem, deleteButton }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark');

  const { id } = useParams();
  const location = useLocation();
  const [current, setCurrent] = useState(id || 0);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState(location.pathname.split("/")[1]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState(initialState(settings.sprint.current));

  useEffect(() => {
    if (Number(current)) {
      async function getData(current) {
        var categories = await getCategories();
        setCategories(categories);

        var item = await getItemById(current);
        console.log(`useEffect`, item);
        setState(item);
        setReady(true);
      }
      getData(current);      
    } else {
      async function getCategoryData() {
        var categories = await getCategories();
        setCategories(categories);
        setReady(true);
      }
      getCategoryData();
    }
  }, [current]);

  const sprintNumbers = sprintsData.map((sprint) => {
    return { value: sprint.id, label: sprint.id };
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`Je hebt ingevuld:`, state);

    current !== 0 ? saveItem(state) : newItem(state);
  }

  const changeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value});
  }

  const setViewItem = () => {
    console.log(`setViewItem`, view);
    setView("view-item");
  };
  const setChangeItem = () => {
    console.log(`setChangeItem`, view);
    setView("edit-item");
  };

  const setCreateItem = () => {
    setCurrent(0);
    setState(initialState());
    setView("edit-item");
  };

  return (
    <div className={`item-view${isDark ? " darkmode" : ""}`}>
      <h2>Item</h2>
      {
        view === "view-item" ?
        ready && 
          <Paper elevation={2}>
            <h2>{state.title}</h2>
            <p>{state.description}</p>
            <p>{`Created: ${state.createDate}`}</p>
            {
              state.upDate !== "" && <p>{`Last update: ${state.upDate}`}</p>
            }
            <Button target="_blank" href={`${settings.azure.subscription}${settings.azure.workItem}${state.link}`}>{`Work item ${state.link}`}</Button>
            <Button onClick={setChangeItem} variant="contained" color="primary">{
              `Edit item ${current}`
            }</Button>
            <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">{
              `Delete item ${current}`
            }</Button>
            <Button onClick={setCreateItem} variant="contained" color="secondary">New item</Button>
          </Paper>
        :
        ready && 
          <form onSubmit={submitHandler} noValidate autoComplete="off">
            <Grid 
              container
              direction="row" 
              justify="flex-start" 
              alignItems="flex-start" 
              spacing={1}
            >
              <Grid item xs={9}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    name="title"  
                    id="textfield" 
                    label="title" 
                    variant="outlined" 
                    value={ state.title } 
                    onChange={changeHandler} />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    select
                    name="type" 
                    id="textfield" 
                    label="type" 
                    value={ state.type } 
                    variant="outlined" 
                    onChange={changeHandler} >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    name="description" 
                    id="textfield" 
                    label="description" 
                    value={ state.description } 
                    multiline
                    rows={6}
                    variant="outlined" 
                    onChange={changeHandler} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    select
                    name="value" 
                    id="textfield" 
                    label="value" 
                    variant="outlined" 
                    value={ state.value } 
                    onChange={changeHandler} >
                      {happines.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}                      
                  </TextField>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    select
                    name="sprintId" 
                    id="textfield" 
                    type="number"
                    label="sprintId" 
                    variant="outlined" 
                    value={ state.sprintId } 
                    onChange={changeHandler} >
                      {sprintNumbers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    name="link" 
                    id="textfield" 
                    label="link" 
                    variant="outlined" 
                    value={ state.link } 
                    onChange={changeHandler} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true} 
                    // helperText="Incorrect entry." 
                    // error
                    required 
                    select
                    name="finished" 
                    id="textfield" 
                    label="finished" 
                    variant="outlined" 
                    value={ state.finished || false } 
                    onChange={changeHandler} >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true}
                    // helperText="Incorrect entry." 
                    // error
                    required
                    id="textfield" 
                    name="startDate"
                    label="startDate" 
                    type="datetime-local" 
                    defaultValue={state.startDate} 
                    InputLabelProps={{
                      shrink: true,
                    }} 
                    onChange={changeHandler} 
                    variant="outlined" />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <TextField 
                    fullWidth={true}
                    id="textfield" 
                    name="endDate"
                    label="endDate" 
                    type="datetime-local" 
                    defaultValue={state.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}           
                    onChange={changeHandler} 
                    variant="outlined" />
                </Paper>
              </Grid>
              {
                current !== 0 &&
                <> 
                  <Grid item xs={6}>
                    <Paper elevation={0}>{`Created: ${state.createDate}`}</Paper>
                  </Grid>                
                  {
                    state.upDate !== "" &&
                    <Grid item xs={6}>
                      <Paper elevation={0}>{`Last update: ${state.upDate}`}</Paper>
                    </Grid>  
                  }
                </>
              }
              <Grid item xs={3}>
                <Button type="submit" variant="contained" color="primary">
                  {
                    current !== 0 ? `Save item ${current}` : "Save new item"
                  }
                </Button>
              </Grid>
            {
              current !== 0 && <>
                <Grid item xs={3}>
                  <Button onClick={setViewItem} variant="contained" color="primary">
                    {`View item ${current}`}
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">
                    {`Delete item ${current}`}
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={setCreateItem} variant="contained" color="secondary">New item</Button>
                </Grid>
              </>
            }
            </Grid>
          </form>
      }
    </div>
  );
}

export default Item;
