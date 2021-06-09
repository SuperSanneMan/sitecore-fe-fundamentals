import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { deleteItem, changeItem, getCategories, getItemById, setItem } from "../services/getService";

function Item() {
  const { id } = useParams();
  const now = `${new Date()}`;
  const [ready, setReady] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    link: "",
    value: "",
    sprintId: "",
    startDate: now,
    endDate: "",
    createDate: now,
    upDate: "",
  });

  useEffect(() => {
    if (Number(id)) {
      async function getData(id) {
        var result = await getItemById(id);
        console.log(`useEffect`, result);
        setState(result);
        setReady(true);
      }
      getData(id);      
    } else {
      setReady(true);
    }
  }, [id]);

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
      const result = await setItem(state);
      console.log(`createItem`, result);
    }

    const saveItem = async (state) => {
      const result = await changeItem(state, state.id);
      console.log(`saveItem`, result);
    }

    id ? saveItem(state) : createItem(state);
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

  return (
    <div>
      <h2>Item</h2>
      {
        ready && <form onSubmit={submitHandler} noValidate autoComplete="off">
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
          <TextField 
            id="textfield" 
            name="createDate"
            label="createDate" 
            type="datetime-local"
            defaultValue={state.createDate} 
            InputLabelProps={{
              shrink: true,
            }}  
            onChange={changeHandler} 
            variant="outlined" />
          <TextField 
            id="textfield" 
            label="upDate" 
            name="upDate"
            type="datetime-local" 
            defaultValue={state.upDate} 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={changeHandler} 
            variant="outlined" />
          <Button type="submit" variant="contained" color="primary">
            {
              id ? "Save Item" : "Create Item"
            }
          </Button>
          {
            id && <>
              <Button component={Link} to="/create-item" variant="contained" color="primary">Create item</Button>
              <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">
                Delete item
              </Button>
            </>
          }
        </form>
      }
    </div>
  );
}

export default Item;