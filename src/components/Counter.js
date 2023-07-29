
import { FaTrashAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import "../styles/Counter.css";
import { useEffect, useRef, useState } from "react";

//timerId={timer.timerNum} timerDate={timer.timerDate} timerName={timer.timerName} timerDrop={timer.timerThumb}

export default function Counter({deleteCount, timerInfos, timerFunc, allCounts, saveDet, changeDet, ftp}){

    const {timerThumb: timerDrop, timerDate, timerName, timerNum: timerId} = timerInfos;
    let [openState, setState1] = useState(0)
    let openMenu = useRef()
    let currName = useRef(timerName);
    let currDate = useRef(timerDate);
    let num = openState;

    let returnedTime = timerFunc(currDate.current);

    function getClicker(id){
        // stopCounting()
        openMenu.current = true;
        setState1(
            (num) => num + 1
        )

    }

    function getClicker2(id){
        // startCounting()
        openMenu.current = false;
        
        let currentTimer = allCounts.filter((item) => {
            return item.timerNum !== timerId ? false : item
        })

        currDate.current = currentTimer[0].timerDate;
        currName.current = currentTimer[0].timerName;

        setState1(
            (num) => num + 1
        )
    }
    
    return(
        <div className="eachCounter">
            <div className="fullImg">
                <img src={timerDrop} alt="" />
            </div>
            <div className="details">

                <div className="controls">
                    <FaTrashAlt onClick={() => deleteCount(timerId)} className="btnCtl trashBtn" role="button" tabIndex="0" />
                    <AiFillSetting className="btnCtl editBtn" role="buton" tabIndex="0" onClick={() => getClicker(timerId)} />
                </div>

                <div className="eachSettingz" style={openMenu.current === true ? {display: "flex"} : {display: "none"}} >

                    <form action="" className="eachForm" onSubmit={saveDet}>

                        <div className="closeFormBtn">
                            <IoMdClose role="button" tabIndex="0" className="closeForm" onClick={() => getClicker2(timerId)} />
                        </div>

                        <label htmlFor="counterName">
                            <span className="formEl">Timer Name</span>
                            <input value={timerName} onBlur={(e) => (e.target.value) !== currName.current && ftp(e, timerId) } className="changeDet" onChange={(e) => changeDet(e, timerId)} type="text" name="timerName" id="counterName" />
                        </label>

                        <label htmlFor="timerLength">
                            <span className="formEl">Timer Date</span>
                            <input value={timerDate} className="changeDet" onChange={(e) => changeDet(e, timerId)}  type="datetime-local" name="timerDate" id="timerLength" />
                        </label>

                        <button type="submit"><BsSave className="btnCtl saveBtn" onClick={(timerId) => getClicker2(timerId)} role="button" tabIndex="0" /></button>
                    </form>
                </div>

                <div className="counterName">{timerName}</div>

                <div className="counterNums">

                    <div className="dayCont">
                        <span className="NumEl" id="numType1">{returnedTime.daysLeft}</span>
                        <span className="detail">Day</span>
                    </div>

                    <div className="hourCont">
                        <span className="NumEl" id="numType2">{returnedTime.hoursLeft}</span>
                        <span className="detail">Hour</span>
                    </div>

                    <div className="minCont">
                        <span className="NumEl" id="numType3">{returnedTime.minsLeft}</span>
                        <span className="detail">Min</span>
                    </div>

                    <div className="secCont">
                        <span className="NumEl" id="numType4">{returnedTime.secsLeft}</span>
                        <span className="detail">Sec</span>
                    </div>

                    <div className="noDis" style={{display: "none"}}>{num}</div>
                </div>
            </div>
            
        </div>
    )
}