import React from "react";

// components
import SearchField from "../search-field/search-field.component";

// assetts and styles
import Logo from "../../logo.svg";
import "./navbar.styles.scss";

const Navbar = ({ title }) => {
  return (
    <header className="mdl-layout__header mdl-layout--fixed-header">
      <div
        id="navbar-content"
        className="mdl-layout__header-row navbar-content"
      >
        <span id="site-identity" className="site-identity">
          <span className="mdl-layout-title">{title}</span>
          <img className="logo" src={Logo} alt="logo" />
        </span>
        <SearchField />
      </div>
    </header>
  );
};

export default Navbar;
