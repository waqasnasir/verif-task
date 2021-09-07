import React from "react";
import PropTypes from "prop-types";
import CheckListItem from "../CheckListItem/CheckListItem";
import styles from "./CheckList.module.css"

const CheckList = ({listData, checkResult, onCheckUpdate}) => {
  return <div className={styles.ListContainer}>
    {
        listData.map((item, index) => {
          const {value} = checkResult[index] || {}
          const previousExist = checkResult[index-1];
          const previousPositiveAns = previousExist && checkResult[index-1].value === "Yes"
          // every check which is not first and previouse check is not answered as yes it should be disbaled. 
          const isDisabled = index > 0 && (!previousExist || !previousPositiveAns)
        return <CheckListItem key={item.id} itemData={item} value={value} onChange={(result) =>onCheckUpdate(index, result)} isDisabled={isDisabled}/>
      })
    }
  </div>;
};

CheckList.propTypes = {
    listData: PropTypes.array,
    checkResult: PropTypes.array,
    onCheckUpdate: PropTypes.func
  };
  CheckList.defaultProps = {
    checkResult: [],
    listData: [],
    onCheckUpdate: () => {}
  };

export default CheckList;
