import { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { deleteItem, getItemById } from "../services/getService";
import { ThemeContext } from '../contexts/ThemeContext';

function View() {
  const { lightTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [ready, setReady] = useState(false);
  const [state, setState] = useState({
    id: "",
    title: "",
    description: "",
    type: "",
    link: "",
    value: "",
    sprintId: "",
    startDate: "",
    endDate: "",
    createDate: "",
    upDate: "",
  });

  useEffect(() => {
    if (id) {
      async function getData(id) {
        var result = await getItemById(id);
        console.log(`View`, result);
        setState(result);
        setReady(true);
      }
      getData(id);      
    } else {
      setReady(true);
    }
  }, [id]);

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
    <div className={!lightTheme ? 'darkmode' : ''}>
      <h2>Item</h2>
      {
        ready && <div>
          <h2>{state.title}</h2>
          <p>{state.description}</p>
          <p>{state.createDate}</p>
          <p>{state.upDate}</p>
          <Button component={Link} to="/create-item" variant="contained" color="primary">Create item</Button>
          <Button component={Link} to={`/edit-item/${id}`} variant="contained" color="primary">Edit item</Button>
          <Button  onClick={deleteButton.onClick(id)} title={`${deleteButton.title}`} variant="contained" color="primary">
            Delete item
          </Button>
        </div> 
      }
    </div>
  )
}

export default View;
