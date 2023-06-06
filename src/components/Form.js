
import "../styles/Form.css"
import { FaRemoveFormat } from "react-icons/fa";

export default function Form({handleUserEntry, submitFunc, formEntry, apiCall, formOpener, formDiv}){
    
    let {timerName, timerDate} = formEntry;
    //formOpener formDiv

    const style1 = {
        overflowX: "auto",
        top: "0vw",
        left: "120vw"
    }

    const style2 = {
        overflowX: "hidden",
        top: "0vw",
        left: "0vw"
    }

    

    return(
        <div className="formCont" style={formDiv === true ? style1 : style2}>
            <span className="closeForm">
                <FaRemoveFormat onClick={formOpener} role="button" tabIndex="0"  />
            </span>

            <form action="" onSubmit={(e) => submitFunc(e)}>
                <label htmlFor="counterName">
                    <span className="formEl">Timer Name</span>
                    <input value={timerName} onBlur={apiCall} onChange={(e) => handleUserEntry(e)} type="text" name="timerName" id="counterName" />
                </label>
                <label htmlFor="timerLength">
                    <span className="formEl">Timer Date</span>
                    <input value={timerDate} onChange={(e) => handleUserEntry(e)} type="datetime-local" name="timerDate" id="timerLength" />
                </label>

                <button className="save" id="save">Submit</button>
            </form>
        </div>
    )
}