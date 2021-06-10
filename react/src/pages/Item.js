import { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useLocation, useParams } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';

import { deleteItem, changeItem, getCategories, getItemById, setItem } from "../services/getService";

const getDateTime = () => {
  const now = new Date();
  const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
  return date.substring(0, date.length-3);
}

const initialState = {
  id: "",
  title: "",
  description: "",
  type: "",
  link: "",
  value: "",
  sprintId: "",
  startDate: getDateTime(),
  endDate: "",
  createDate: "",
  upDate: "",
}

function Item() {
  const { lightTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const location = useLocation();
  const [current, setCurrent] = useState(id || 0);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState(location.pathname.split("/")[1]);
  // const [categories, setCategories] = useState([]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (Number(current)) {
      async function getData(current) {
        var result = await getItemById(current);
        console.log(`useEffect`, result);
        setState(result);
        setReady(true);
      }
      getData(current);      
    } else {
      setReady(true);
    }
  }, [current]);

  // useEffect(() => {
  //   if (categories.length === 0) {
  //     async function getCategoryData() {
  //       var result = await getCategories();
  //       setCategories(result);
  //     }
  //     getCategoryData();
  //   }
  // }, [categories.length]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`Je hebt ingevuld:`, state);

    const createItem = async (state) => {
      const now = new Date();
      const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
      const data = {...state, createDate: date.substring(0, date.length-3) };
      const result = await setItem(data);
      console.log(`createItem`, result);
    }
    
    const saveItem = async (state) => {
      const now = new Date();
      const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
      const data = {...state, upDate: date.substring(0, date.length-3) };

      console.log(`saveItem 1`, data);
      const result = await changeItem(data, state.id);
      console.log(`saveItem 2`, result);
    }

    current !== 0 ? saveItem(state) : createItem(state);
  }

  const changeHandler = (event) => {
    console.log(`changeHandler`, event.target.name, event.target.value);
    setState({ ...state, [event.target.name]: event.target.value});
  }

  const deleteButton = {
    title: "Delete item",
    onClick: id => e => {
      console.log(`1 - Delete item ${id}`);
      const getItems = async () => {
        var result = await deleteItem(id);
        console.log(`2 - Delete item ${id}`, result);
      }
      getItems();
    }
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
    setState(initialState);
    setView("edit-item");
  };

  // 2 functional state update
  // const setViewItem = () => {
    // console.log(`setViewItem`, view);
    // setView((view) => "view-item")
  // }; 
  // const setChangeItem = () => {
    // console.log(`setChangeItem`, view);
    // setView(view => "edit-item")
  // }; 

  const getDateTime = (string) => {
    return string === "" ? "" : new Date(string);
  }

  return (
    <div className={`item-view ${!lightTheme ? " darkmode" : ""}`}>
      {
        view === "view-item" ?
        ready && 
        <div className="form-view">
          <h2>{state.title}</h2>
          <p>{state.description}</p>
          <p>{`Created: ${state.createDate}`}</p>
          {
            state.upDate !== "" && <p>{`Last update: ${state.upDate}`}</p>
          }
          <Button onClick={setChangeItem} variant="contained" color="primary">{
            `Edit item ${current}`
          }</Button>
          <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">{
            `Delete item ${current}`
          }</Button>
          <Button onClick={setCreateItem} variant="contained" color="secondary">New item</Button>
        </div>
        :
        ready && <div className="form-view">
          <form onSubmit={submitHandler} noValidate autoComplete="off">
            <TextField name="title"  id="textfield" label="title" variant="outlined" value={ state.title } onChange={changeHandler}  />
            <TextField name="description"  id="textfield" label="description" value={ state.description } variant="outlined" onChange={changeHandler}  />
            <TextField name="type"  id="textfield" label="type" value={ state.type } variant="outlined" onChange={changeHandler}  />
            <TextField name="link"  id="textfield" label="link" variant="outlined" value={ state.link } onChange={changeHandler}  />
            <TextField name="value"  id="textfield" label="value" variant="outlined" value={ state.value } onChange={changeHandler}  />
            <TextField name="sprintId"  id="textfield" label="sprintId" variant="outlined" value={ state.sprintId } onChange={changeHandler}  />
            <TextField 
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
            <TextField 
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
              {
                current !== 0 && <>
                  <p>{`Created: ${state.createDate}`}</p>
                  {
                    state.upDate !== "" && <p>{`Last update: ${state.upDate}`}</p>
                  }
                </>
              }
            <Button type="submit" variant="contained" color="primary">
              {
                current !== 0 ? `Save item ${current}` : "Save new item"
              }
            </Button>
            {
              current !== 0 && <>
                <Button onClick={setViewItem} variant="contained" color="primary">{
                  `View item ${current}`
                }</Button>
                <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">{
                  `Delete item ${current}`
                }</Button>
                <Button onClick={setCreateItem} variant="contained" color="secondary">New item</Button>
              </>
            }
          </form>
        </div>
      }
    </div>
  );
}

export default Item;
