import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, ...rest }) => {
  return (
    <button className={styles.Button} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
