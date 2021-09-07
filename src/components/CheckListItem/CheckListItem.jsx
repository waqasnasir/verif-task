import React from "react";
import PropTypes from "prop-types";
import CheckToggle from "../CheckToggle/CheckToggle";
import { ONE_KEY, TWO_KEY } from "../../utils/constants"
import styles from "./CheckListItem.module.css"


const CheckListItem = ({ itemData, onChange, value = "", isDisabled }) => {
    const { id, description } = itemData
    const handleKeyDown = (e) => {
        if (!isDisabled) {
            if (e.keyCode === ONE_KEY) {
                // if yes is already selected unselect or select yes
                onChange({ value: value === "Yes" ? "" : "Yes", checkId: id })
            }
            if (e.keyCode === TWO_KEY) {
                onChange({ value: value === "No" ? "" : "No", checkId: id })
            }
        }
    }
    return <>
        <div
            className={`${styles.CheckItemContainer} ${isDisabled ? styles.disabled : ""}`}
            tabIndex="0"
            onKeyDown={handleKeyDown}>
            <div className="checkDescription"> {description}  </div>
            <CheckToggle
                checkId={id}
                onChange={onChange}
                value={value}
                isDisabled={isDisabled} />

        </div>
    </>;
};

CheckListItem.propTypes = {
    itemData: PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        priority: PropTypes.number
    }),
    onChange: PropTypes.func,
    value: PropTypes.string,
    isDisabled: PropTypes.bool
};
CheckListItem.defaultProps = {
    itemData: {},
    value: "",
    onChange: () => { },
    isDisabled: false,
};

export default CheckListItem;
