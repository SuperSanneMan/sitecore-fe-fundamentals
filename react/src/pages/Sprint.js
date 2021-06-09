import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { setItem } from "../services/getService";

function Item() {
  const [state, setState] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    link: "",
    value: "",
    startData: "", // Eerste van de week om de twee
    endDate: "",
    createdDate: "",
    upDate: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`Je hebt ingevuld:`, state);

    const putItem = async (state) => {
      const result = await setItem(state, 5);
      console.log(`putItem`, result);
    }

    putItem(state);
  }

  const changeHandler = (event) => {
    console.log(`Event`, event.target);
    setState({ ...state, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <h2>Sprint</h2>
      <form onSubmit={submitHandler} noValidate autoComplete="off">
        <TextField name="title" id="textfield" label="title" variant="outlined" onChange={changeHandler}  />
        <TextField name="description" id="textfield" label="description" variant="outlined" onChange={changeHandler}  />
        <TextField name="goal" id="textfield" label="goal" variant="outlined" onChange={changeHandler}  />
        <TextField name="type" id="textfield" label="type" variant="outlined" onChange={changeHandler}  />
        <TextField name="link" id="textfield" label="link" variant="outlined" onChange={changeHandler}  />
        <TextField name="duration" id="textfield" label="duration" variant="outlined" onChange={changeHandler}  />
        <TextField name="value" id="textfield" label="duration" variant="outlined" onChange={changeHandler}  />
        <TextField 
          id="textfield" 
          name="startData"
          label="startData" 
          type="datetime-local" 
          defaultValue="2017-05-24T10:30" 
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
          defaultValue="2017-05-24T10:30" 
          InputLabelProps={{
            shrink: true,
          }}           
          onChange={changeHandler} 
          variant="outlined" />
        <TextField 
          id="textfield" 
          name="createdDate"
          label="createdDate" 
          type="datetime-local"
          defaultValue="2017-05-24T10:30" 
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
          defaultValue="2017-05-24T10:30" 
          InputLabelProps={{
            shrink: true,
          }} 
          onChange={changeHandler} 
          variant="outlined" />    
        <Button type="submit" variant="contained" color="primary">
        Create Sprint
        </Button>
      </form>
    </div>
  );
}

export default Item;
