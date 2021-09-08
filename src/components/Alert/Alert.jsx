import React from "react"
import PropTypes from "prop-types"
import styles from "./Alert.module.css"

const Alert = ({ children, type, ...rest }) => (
  <div className={`${styles.Alert} ${styles[type]}`} {...rest}>
    {children}
  </div>
)

Alert.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
}
Alert.defaultProps = {
  children: [],
  type: PropTypes.string,
}

export default Alert
