import React from "react";
import PropTypes from "prop-types";
import styles from "./CheckToggle.module.css"

const CheckToggle = ({ onChange, checkId, value, isDisabled }) => {
    const handleYes = () => {
        onChange({ value: value === "Yes" ? "" : "Yes", checkId })
    }
    const handleNo = () => {
        onChange({ value: value === "No" ? "" : "No", checkId })
    }
    return <div className={styles.CheckContainer}>
        <input
            type="radio"
            id={`${checkId}-yes`}
            name={checkId}
            checked={value === "Yes"}
            onClick={handleYes}
            disabled={isDisabled} />
        <label
            for={`${checkId}-yes`}
            className={`${styles.YesButton} ${isDisabled ? styles.disabled : ""}`}>
            Yes
            </label>

        <input
            type="radio"
            id={`${checkId}-no`}
            name={checkId}
            checked={value === "No"}
            onClick={handleNo}
            disabled={isDisabled} />
        <label
            for={`${checkId}-no`}
            className={`${styles.NoButton} ${isDisabled ? styles.disabled : ""}`}>
            No
            </label>
    </div>;
};

CheckToggle.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    checkId: PropTypes.string,
    isDisabled: PropTypes.bool
};
CheckToggle.defaultProps = {
    onChange: () => { },
    value: "",
    checkId: "",
    isDisabled: false
};

export default CheckToggle;


