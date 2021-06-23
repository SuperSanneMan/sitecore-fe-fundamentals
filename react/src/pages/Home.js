import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

import { CustomThemeContext } from '../contexts/ThemeContext';
import { useItemsData } from "../hooks/useHooks";
import { date } from "../helpers/helpers";
import List from '../components/List';

function Home({ itemsData, deleteButton, saveItem }) {
  const { currentTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark');
  const [items, setItems] = useState(itemsData);

  useItemsData(itemsData, setItems);

  return (
    <div className={`item-view${isDark ? " darkmode" : ""}`}> 
      <h2>{`Daily Stand Up ${date()}`}</h2>
      {
        items.length > 0 &&
        <Grid 
          container
          spacing={0}
          direction="column"
          justify="center"
        >
          <h3>Gisteren</h3>
          <List items={items} variant={"before-today"} deleteButton={deleteButton} saveItem={saveItem} hasForwardOption={true} /> 
          <h3>Vandaag</h3>
          <List items={items} variant={"today"} deleteButton={deleteButton} saveItem={saveItem} />        
        </Grid>
      }    
      <Button component={Link} to="/create-item" variant="contained" color="primary">Create item</Button>
    </div> 
  );
}
export default Home;
