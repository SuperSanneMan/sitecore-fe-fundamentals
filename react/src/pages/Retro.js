import { useContext, useState } from "react";

import Grid from '@material-ui/core/Grid';
import List from '../components/List';

import { CustomThemeContext } from '../contexts/ThemeContext';
import { useItemsData } from "../hooks/useHooks";

function Retro({ itemsData, deleteButton, saveItem }) { 
  const [items, setItems] = useState(itemsData);
  const { currentTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark');

  useItemsData(itemsData, setItems);

  const sprintAvarage = () => {
    let totalValue = 0;
    items.length > 0 && items.forEach((item) => {
      totalValue = totalValue + item.value;
    })
    
    return Math.round(totalValue / items.length * 10) / 10;
  }

  return (
    <div className={`item-view${isDark ? " darkmode" : ""}`}>
      <h2>Retrospective</h2>
      {
        items.length > 0 &&
        <Grid 
          container
          spacing={0}
          direction="column"
          justify="center"
        >
          <h3>{`Sprint cijfer ${sprintAvarage()}`}</h3>         
          <h3>{`Items waar ik blij van wordt`}</h3>
          <List items={items} variant={"satisfied"} deleteButton={deleteButton} saveItem={saveItem} />           
          <h3>{`Items waar ik NIET blij van wordt`}</h3>
          <List items={items} variant={"not-satisfied"} deleteButton={deleteButton} saveItem={saveItem} />
        </Grid>
      } 
    </div>
  );
}

export default Retro;
