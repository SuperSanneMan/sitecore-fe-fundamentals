import { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { deleteItem, getAll, getItemsBySprintId, getCommentsBySprintId } from "../services/getService";

import Component from "../components/Component";
import { ThemeContext } from '../contexts/ThemeContext';

function Home() {
  const { lightTheme } = useContext(ThemeContext);
  const [current, setCurrent] = useState(1);
  const [sprints, setSprints] = useState([]);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    async function getData() {
      var result = await getAll();
      setSprints(result);
      var items = await getItemsBySprintId(1);
      setItems([items]);
    }
    getData();
  }, [current]);

  const button = {
    title: "meer informatie",
    onClick: sprintId => e => {
      console.log(`meer informatie ${sprintId}`);
      setCurrent(sprintId);
      const getItems = async () => {
        var result = await getItemsBySprintId(sprintId);
        setItems([result]);

        var result2 = await getCommentsBySprintId(sprintId);
        setComments([result2]);
      }
      getItems();
    }
  }

  const close = sprintId => e => {
    console.log(`sluit informatie ${sprintId}`);
    if (sprintId === "items") {
      setItems([]);
    } else if (sprintId === "comments") {
      setComments([]);
    }
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
    <div className={!lightTheme ? "darkmode" : ""} style={{ margin: "0 auto", width: "50%", backgroundColor: "lightblue" }}>
      <h2>Home</h2>
        {
          sprints.map((sprint, index) => <Component key={index} data={sprint} button={button} />)
        }  
        {/* <Link to="/create-sprint">Create sprint</Link>  */}
      {
        items.length > 0 &&
        <>
          <h2>{`Personal items sprint ${current}`}</h2>
          {/* <button onClick={close("items")} title={`Close items`}>Close items</button> */}
          {
            
            items.map((item, index) => {
              return item.length > 0 && item.map((item, index2) => {
                return (
                  <div key={index2}>
                    
                    <h3>{ item.title }</h3>
                    <p>{ item.createDate }</p>
                    <Button component={Link} to={`/view-item/${item.id}`} variant="contained" color="primary">View item</Button>
                    <Button component={Link} to={`/edit-item/${item.id}`} variant="contained" color="primary">Edit item</Button>
                    <Button  onClick={deleteButton.onClick(item.id)} title={`${deleteButton.title}`} variant="contained" color="primary">
                      Delete item
                    </Button>
                </div>
                );
              })
            })
          }
          <Button component={Link} to="/create-item" variant="contained" color="primary">Create item</Button>
        </>
      }     
    </div>
  );
}
export default Home;
