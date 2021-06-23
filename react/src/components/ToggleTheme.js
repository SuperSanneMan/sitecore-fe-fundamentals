import React, { useContext } from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';
import { CustomThemeContext } from '../contexts/ThemeContext';

function ToggleTheme() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark');

  const toggle = (event) => {
    const { checked } = event.target

    setTheme(checked ? 'dark' : 'normal');
  }

  return (
    <div className="toggle__box">
        <span>
        {isDark ? (
            <img src={moon} className="moon-icon" alt="DarkTheme" />                     
        ) : (
            <img src={sun} className="sun-icon" alt="LightTheme" />
        )}
        </span>
        <div className="toggle__btn">
            <input type="checkbox" className="checkbox" onChange={toggle} />
            <div className="circle"></div>
            <div className="layer"></div>
        </div>
    </div>
  )
}

export default ToggleTheme;