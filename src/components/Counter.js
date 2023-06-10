
import { FaTrashAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import "../styles/Counter.css";
import { useEffect, useRef, useState } from "react";

//timerId={timer.timerNum} timerDate={timer.timerDate} timerName={timer.timerName} timerDrop={timer.timerThumb}

export default function Counter({deleteCount, timerInfos, allCounts, saveDet, changeDet, ftp}){

    const {timerThumb: timerDrop, timerDate, timerName, timerNum: timerId} = timerInfos;

    let [state1, setState1] = useState(0);

    let [sec, setSec] = useState('')

    let openMenu = useRef(timerInfos.edit);

    let currDate = useRef(timerInfos.timerDate)

    let obj = useRef({
        days: "00",
        hours: "00",
        mins: "00",
        secs: "00"
    })

    let timerRef = useRef('');

    let currName = useRef(timerInfos.timerName);

    const startTimer = () => {

        timerRef.current = setInterval(
            () => {
                let currTime = new Date().getTime();
                let futureTime = new Date(currDate.current).getTime();
                let remainingTime = futureTime - currTime;
                let daysLeft = Math.floor((remainingTime / 1000 / 3600 / 24) % 24);
                let hoursLeft =  Math.floor((remainingTime / 1000 / 3600) % 24);
                let minsLeft =  Math.floor((remainingTime / 1000 / 60) % 60);
                let secsLeft =  Math.floor((remainingTime / 1000) % 60);

                obj.current = {
                    days: daysLeft > 9 ? daysLeft : `0${daysLeft}`,
                    hours: hoursLeft > 9 ? hoursLeft : `0${hoursLeft}`,
                    mins: minsLeft > 9 ? minsLeft : `0${minsLeft}`,
                    secs: secsLeft > 9 ? secsLeft : `0${secsLeft}`
                };

                setSec(
                    () => secsLeft
                )

            }, 1000
        )

    }

    const stopTimer = () => {
        clearInterval(timerRef.current);
    }

    if(sec < 0){
        obj.current.secs = `00`;
        obj.current.mins = `00`;
        obj.current.hours = `00`;
        obj.current.days = `00`;
        stopTimer();
    }

    useEffect(
        () => {
            startTimer()
        }
    )

    let num = state1;

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
                        <span className="NumEl" id="numType1">{obj.current.days}</span>
                        <span className="detail">Day</span>
                    </div>

                    <div className="hourCont">
                        <span className="NumEl" id="numType2">{obj.current.hours}</span>
                        <span className="detail">Hour</span>
                    </div>

                    <div className="minCont">
                        <span className="NumEl" id="numType3">{obj.current.mins}</span>
                        <span className="detail">Min</span>
                    </div>

                    <div className="secCont">
                        <span className="NumEl" id="numType4">{obj.current.secs}</span>
                        <span className="detail">Sec</span>
                    </div>

                    <div className="noDis" style={{display: "none"}}>{num}</div>
                </div>
            </div>
            
        </div>
    )
}