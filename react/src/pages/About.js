import { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext';

function About() {
  const { lightTheme } = useContext(ThemeContext);

  return (
    <div className={`item-view ${!lightTheme ? " darkmode" : ""}`}>
      <h2>About</h2>
    </div>
  );
}

export default About;
