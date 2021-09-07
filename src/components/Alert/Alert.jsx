import React from "react";
import PropTypes from "prop-types";
import styles from "./Alert.module.css";

const Alert = ({ children, type, ...rest }) => {
  return (
    <div className={`${styles.Alert} ${styles[type]}`} {...rest}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Alert;
