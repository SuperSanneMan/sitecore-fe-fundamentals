import { useReducer, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { changeItem, deleteItem, getItemsBySprintId, setItem } from "./services/getService";
import { useGetData } from "./hooks/useHooks";
import useStateReducer from "./hooks/useStateReducer";
import "./App.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Retro from "./pages/Retro";
import Dashboard from "./pages/Dashboard";
import Item from "./pages/Item";
import Sprint from "./pages/Sprint";

const routes = {
  home: "/",
  retro: "/retro",
  dashboard: "/dashboard",
  createItem: "/create-item",
  viewItem: "/view-item/:id",
  editItem: "/edit-item/:id",
  createSprint: "/create-sprint",
};

const initialState = {
  items: [],
  settings: {},
  sprints: [],
}

function App() {
  const [loading, setLoading] = useState(true);
  const [store, dispatch] = useReducer(useStateReducer, initialState);
  const {
    home,
    retro,
    dashboard,
    createItem,
    viewItem,
    editItem,
    createSprint,
  } = routes;

  useGetData(dispatch, setLoading);

  const newItem = async (state) => {
    const now = new Date();
    const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
    const data = {...state, createDate: date.substring(0, date.length-3) };
    const item = await setItem(data);
    store.items.push(item);

    dispatch({ type: 'set-items', payload: [...store.items] });
    notify("New item saved!");   
  }

  const notify = (message, delay = 2000) => toast.success(message, { autoClose: delay });
  
  const saveItem = async (state) => {
    const now = new Date();
    const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
    const data = {...state, upDate: date.substring(0, date.length-3) };

    const item = await changeItem(data, state.id);
    const index = store.items.findIndex((item) => Number(item.id) === Number(state.id));
    store.items[index] = item;

    dispatch({ type: 'set-items', payload: [...store.items] });
    notify("Item saved!"); 
  }

  const removeItem = async (id) => {
    await deleteItem(id);
    const index = store.items.findIndex((item) => Number(item.id) === Number(id));
    store.items.splice(index, 1)

    dispatch({ type: 'set-items', payload: [...store.items] });
    notify("Item removed!"); 
  }

  const getItems = async (id) => {
    var items = await getItemsBySprintId(id);
    dispatch({ type: 'set-items', payload: items });
  }

  const deleteButton = {
    title: "Delete item",
    onClick: id => e => {
      removeItem(id);
    }
  }   

  const setSprint = {
    title: "Set active sprint",
    onClick: sprintId => e => {
      getItems(sprintId);
    }
  }  

  return (
    <div className="App">
      { !loading && 
      <Router>
        <Navigation routes={routes} /> 
        <ToastContainer position="top-center" />      
        <Switch>
          <Route exact path={home}>
            <Home itemsData={store.items} deleteButton={deleteButton} saveItem={saveItem} />
          </Route>
          <Route path={retro}>
            <Retro itemsData={store.items} deleteButton={deleteButton} saveItem={saveItem} />
          </Route>
          <Route path={dashboard}>
            <Dashboard settings={store.settings} sprintsData={store.sprints} itemsData={store.items} deleteButton={deleteButton} setSprint={setSprint} saveItem={saveItem} />
          </Route>
          <Route path={viewItem}>
            <Item settings={store.settings} sprintsData={store.sprints} newItem={newItem} saveItem={saveItem} deleteButton={deleteButton} />
          </Route>
          <Route path={createItem}>
            <Item settings={store.settings} sprintsData={store.sprints} newItem={newItem} saveItem={saveItem} deleteButton={deleteButton} />
          </Route>
          <Route path={editItem}>
            <Item settings={store.settings} sprintsData={store.sprints} newItem={newItem} saveItem={saveItem} deleteButton={deleteButton} />
          </Route>
          <Route path={createSprint}>
            <Sprint />
          </Route>          
        </Switch>    
      </Router>
      }
    </div>
  );
}

export default App;
