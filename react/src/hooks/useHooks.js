import { useEffect } from "react";
import { getAllSprints, getItemsBySprintId, getSettings } from "../services/getService";

export const useGetData = (dispatch, setLoading) => {
  useEffect(() => {
    async function getData() {
      var settings = await getSettings();
      dispatch({ type: 'set-settings', payload: settings });
      
      var sprints = await getAllSprints();
      dispatch({ type: 'set-sprints', payload: sprints });
      
      var items = await getItemsBySprintId(settings.sprint.current);
      dispatch({ type: 'set-items', payload: items });

      setLoading(false);
    }
    getData();
  }, [dispatch, setLoading]);
}

export const useItemsData = (itemsData, setItems) => {
  useEffect(() => {
    setItems(() => itemsData);
  }, [itemsData, setItems]); 
}
