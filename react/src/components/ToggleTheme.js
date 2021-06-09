import React, { useContext, useState } from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';
import { ThemeContext } from '../contexts/ThemeContext';

function ToggleTheme() {
  const { toggleTheme } = useContext(ThemeContext);
  const [icon, setIcon] = useState(true);

  const iconChange = () => {
    // let newIcon = !icon;
    setIcon(!icon);
  }

  return (
    <div className="toggle__box">
        <span>
        {icon ? (
            <img src={moon} className="moon-icon" alt="DarkTheme" />                     
        ) : (
            <img src={sun} className="sun-icon" alt="LightTheme" />
        )}
        </span>
        <div className="toggle__btn" onClick={toggleTheme}>
            <input type="checkbox" className="checkbox"
            onChange={iconChange}  />
            <div className="circle"></div>
            <div className="layer"></div>
        </div>
    </div>
  )
}

export default ToggleTheme;