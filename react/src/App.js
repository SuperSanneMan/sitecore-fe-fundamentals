import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { getAll } from "./services/getService";
import "./App.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Item from "./pages/Item";
import Sprint from "./pages/Sprint";
import ThemeContextProvider from './contexts/ThemeContext';

const routes = {
  home: "/",
  about: "/about",
  dashboard: "/dashboard",
  createItem: "/create-item",
  viewItem: "/view-item/:id",
  editItem: "/edit-item/:id",
  createSprint: "/create-sprint",
};

function App() {
  const [data, setData] = useState([]);
  const {
    home,
    about,
    dashboard,
    createItem,
    viewItem,
    editItem,
    createSprint,
  } = routes;

  useEffect(() => {
    async function getData() {
      var result = await getAll();
      setData(result);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <ThemeContextProvider>
        <Router>
          <Navigation routes={routes} />
          <Switch>
            <Route exact path={home}>
              <Home />
            </Route>
            <Route path={about}>
              <About />
            </Route>
            <Route path={dashboard}>
              <Dashboard />
            </Route>
            <Route path={viewItem}>
              <Item />
            </Route>
            <Route path={createItem}>
              <Item />
            </Route>
            <Route path={editItem}>
              <Item />
            </Route>          
            <Route path={createSprint}>
              <Sprint />
            </Route>          
          </Switch>        
        </Router>
        <div className="footer"><p>Go Team!</p></div>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
