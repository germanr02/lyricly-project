import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ type, icon, children, buttonColor, textColor, id }) => {
  return (
    <button
      id={`${id}`}
      name="submit"
      type={type}
      className="custom-button"
    >
      <i className="material-icons">{icon}</i> {children}
    </button>
  )
};

// return (
//     <button
//       id={`${id}`}
//       name="submit"
//       type={type}
//       className={`
//       mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect 
//       ${(buttonColor) ? "mdl-color--" + buttonColor : "mdl-button--colored"}
//       ${(textColor) ? "mdl-color-text--" + textColor : ""}
//       custom-button`}
//     >
//       <i className="material-icons">{icon}</i> {children}
//     </button>
//   );

export default CustomButton;
