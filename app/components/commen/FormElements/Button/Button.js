//-----------------------------------------------------------------------------------------//
//                             Reusable button components                                  //
//-----------------------------------------------------------------------------------------//
import React from "react";
import PropTypes from "prop-types";
import Styles from "./Button.module.scss";

const Button = ({ id, children, onClick, type = "button", className = "" }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`${Styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export default Button;
