import React, { useEffect, useState } from "react";
import CheckList from "../CheckList/CheckList";
import Button from "../Button/Button"
import Alert from "../Alert/Alert"
import { fetchChecks, submitCheckResults } from "../../api";
import { UP_KEY, DOWN_KEY, ENTER_KEY } from "../../utils/constants"
import { focusNextElement, focusPreviousElement } from "../../utils/utils"
import styles from "./AnsweringChecks.module.css"


const AnsweringChecks = () => {
    const [checkData, setCheckData] = useState([])
    const [checkResult, setCheckResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState({})

    const fetchChecksData = async () => {
        setLoading(true);
        setToast({})
        try {
            const data = await fetchChecks();
            data.sort((a, b) => a.priority > b.priority ? 1 : -1) // sorting data based on priority
            setCheckData(data)
            setToast({ messageType: "Success", message: "Checks loaded successfully." })
        } catch (error) {
            setToast({ messageType: "Danger", message: "Something went wrong. Could not fetch checks. Please try again!" })
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchChecksData()
    }, [])

    // making toase message disappear in 3 seconds
    useEffect(() => {
        if (toast.message) {
            setTimeout(() => setToast({}), 3000)
        }
    }, [toast])

    const handleCheckUpdate = (index, result) => {
        let newResults = [...checkResult]
        newResults.splice(index);
        // if new values is either yes or no push that to checkdata
        if (result.value) {
            newResults.push(result);
        }
        setCheckResult(newResults)

    }

    const handleSubmit = async () => {
        setLoading(true)
        setToast({})
        try {
            await submitCheckResults(checkResult)
            setToast({ messageType: "success", message: "Successfully Submitted" })
        } catch (error) {
            setToast({ messageType: "danger", message: "Something went wrong. Could not submit checks. Please try again!" })

        }
        setLoading(false)
    }

    const handleKeyDown = (e) => {
        // Up Key
        if (e.keyCode === UP_KEY) {
            focusPreviousElement()
        }
        // Down Key
        if (e.keyCode === DOWN_KEY) {
            focusNextElement()
        }
    }

    const handleSubmitKeyDown = (e) => {
        // entery key
        if (e.keyCode === ENTER_KEY) {
            handleSubmit()
        }
    }

    const checkDisabled = () => {
        // if any of answer is No then return false 
        for (let i = 0; i < checkResult.length; i++) {
            const { value } = checkResult[i];
            if (value === "No") {
                return false;
            }
            else if (value === "Yes") {
                continue;
            } else {
                return true
            }

        }
        // making sure no check is left unanswered
        return checkResult.length !== checkData.length
    }
    const submitDisabled = checkDisabled()
    const { messageType, message } = toast;
    return <div className={styles.AnswerContainer} onKeyDown={handleKeyDown}>
        {loading ? "Loading..." : null}
        {message ? <Alert type={messageType}>{message}</Alert> : null}
        <CheckList listData={checkData} onCheckUpdate={handleCheckUpdate} checkResult={checkResult} />
        {
            checkData.length > 0 && <div className={styles.Submit}>
                <Button disabled={submitDisabled} onClick={handleSubmit} onKeyDown={handleSubmitKeyDown}>Submit</Button>
            </div>
        }


    </div>;
};

export default AnsweringChecks;
