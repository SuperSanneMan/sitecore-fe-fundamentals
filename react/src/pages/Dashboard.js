import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import { CustomThemeContext } from '../contexts/ThemeContext';
import { useItemsData } from "../hooks/useHooks";
import List from '../components/List';
import Component from "../components/Component";

function Dashboard({ settings, sprintsData, itemsData, deleteButton, setSprint, saveItem }) {
  const [items, setItems] = useState(itemsData);
  const { currentTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark');

  useItemsData(itemsData, setItems);  

  return (
    <div className={`item-view${isDark ? " darkmode" : ""}`}>
      <h2>Dashboard</h2>
      {
        items.length > 0 &&
        <Grid 
          container
          spacing={0}
          direction="column"
          justify="center"
        >
          <h3>Active sprint items</h3>
          <List items={items} variant={"active"} deleteButton={deleteButton} saveItem={saveItem} />         
          <h3>Finished sprint items</h3>
          <List items={items} variant={"finished"} deleteButton={deleteButton} saveItem={saveItem} />
        </Grid>
      } 
      <h3>Other sprints</h3>
      {
        sprintsData.map((sprint, index) => {
          return(
            <div key={index}>
              <Component key={index} data={sprint} button={setSprint} />
              <Button target="_blank" href={`${settings.azure.subscription}${settings.azure.taskboard}${sprint.link}`}>{`1 Sprint board ${sprint.title}`}</Button>
              <Button target="_blank" href={`${settings.azure.subscription}${settings.azure.taskboard}${sprint.link2}`}>{`2 Sprint board ${sprint.title}`}</Button>
            </div>
          )
        })
      }   
      <Button size="small" component={Link} to={`/create-sprint`} variant="contained" color="secondary">Create sprint</Button>  
    </div>
  );
}

export default Dashboard;
