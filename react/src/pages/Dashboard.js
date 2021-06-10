import { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext';

function Dashboard() {
  const { lightTheme } = useContext(ThemeContext);
  
  return (
    <div className={`item-view ${!lightTheme ? " darkmode" : ""}`}>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;
