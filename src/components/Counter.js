
import { FaTrashAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import "../styles/Counter.css";
import { useRef, useState } from "react";

//timerId={timer.timerNum} timerDate={timer.timerDate} timerName={timer.timerName} timerDrop={timer.timerThumb}

export default function Counter({deleteCount, timerInfos, allCounts, saveDet, changeDet, ftp}){

    const {timerThumb: timerDrop, timerDate, timerName, timerNum: timerId} = timerInfos;

    let openMenu = useRef(timerInfos.edit);

    let [state1, setState1] = useState(0);

    let currDate = useRef(timerInfos.timerDate)

    let obj = useRef({
        days: "00",
        hours: "00",
        mins: "00",
        secs: "00"
    })

    let currName = useRef(timerInfos.timerName);

    // console.log(currDate)

    function eachTimer(){
        // console.log(currDate.current)
        const currentTime = new Date().getTime();
        const futureTime = new Date(currDate.current).getTime();
        
        let remainigTime = futureTime - currentTime;
        let daysLeft = Math.floor((remainigTime / 1000 / 3600 ) / 24);
        let hoursLeft =  Math.floor((remainigTime / 1000 / 3600) % 24);
        let minsLeft =  Math.floor((remainigTime / 1000 / 60) % 60);
        let secsLeft =  Math.floor(((remainigTime / 1000) % 60) + 1);
        
        obj.current.days = daysLeft;
        obj.current.hours = hoursLeft;
        obj.current.mins = minsLeft;
        obj.current.secs = secsLeft;

        setState1(
            (num) => num + 1
        )
    }

    setInterval(eachTimer, 1000)


    setTimeout(
        () => {
            // startCounting()
        }, 3000
    )

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

                </div>
            </div>
            {/* <div className="settings">
                <form action="">
                    <label htmlFor="name">
                        <span className="changeName">New Name</span>
                        <input type="text" name="" id="name" />
                    </label>
                    <label htmlFor="date">
                        <span className="changeName">New Date</span>
                        <input type="datetime-local" name="" id="date" />
                    </label>
                </form>
            </div> */}
        </div>
    )
}