import React, { useState, useEffect } from "react";

import "./input-field.styles.scss";

const InputField = ({ handleChange, handleFocus, handleBlur, label, id, type, ...otherProps }) => {

  //Event listener for screen size?
  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label input-field">
      <input
        {...otherProps}
        id={id}
        onBlur={handleBlur || null}
        onFocus={handleFocus || null}
        onChange={handleChange}
        className="mdl-textfield__input input-field-input"
      />
      <label className={`input-label ${(otherProps.value) ? "is-input" : ""}`} htmlFor={id}>
        {label} 
      </label>
    </div>
  );
};

export default InputField;
