import Counter from './components/Counter';
import Form from './components/Form';
import Footer from './components/Footer';
import './App.css';
import { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";

function App() {

  let bGArray = ["github.jpg", "github2.jpg", "github3.jpg", "github4.jpg", "github5.jpg"]

  // getting and saving user entries to usestate and local storage

  let [closeFormBool, setFormState] = useState(true);

  let [overfloat, setFlow] = useState(true)

  let [countDowns, setCountDowns] = useState(JSON.parse(localStorage.getItem("todosCountDown")) || []);

  let [userEntry, setUserEntry] = useState({
    timerName: "",
    timerDate: "",
    edit: false,
    timerThumb: "",
    timerNum: ""
  })

  function closeForm(){
    setFormState(
      (oldState) => {
        return !(oldState)
      }
    )

    setOverFlow()
  };

  function setOverFlow(){
    if(closeFormBool === true){
      setFlow(
        (val) => {
          return !(val)
        }
      )
    }else{
      setFlow(
        (val) => {
          return !(val)
        }
      )
    }
  }

  function handleEntry(e){
    const {name, value} = e.target;
    setUserEntry(
      (oldEntry) => {
        return {
          ...oldEntry, 
          [name] : value,
        }
      }
    )
  }

  function handleSubmit(e){
    e.preventDefault();

    setCountDowns(
      (oldCountDown) => {
        return [...oldCountDown, userEntry]
      }
    );

    setUserEntry(
      () => {
        return {
          timerName: "",
          timerDate: "",
          edit: false,
          timerThumb: "",
          timerNum: ""
        }
      }
    )

  }


  async function getBackDrop(){

    if(userEntry.timerName === "")return;

    let text = userEntry.timerName.toLowerCase();

    let backDrop;

    try{
      const myKey = `D5Uuj8BTp5wUzFEBuZ2hBxrN9M6op4MyZHS3puOwCO0`;
      const serverResponse = await fetch(`https://api.unsplash.com/search/photos?query=${text.toLowerCase()}&client_id=`+myKey);
      const resp = await serverResponse.json();
      let ranNum = Math.floor(Math.random() * resp.results.length)
      const data = resp.results[ranNum].urls.small;
      backDrop = (data);
    }catch{
      backDrop = (`BG/${bGArray[Math.floor(Math.random() * bGArray.length)]}`)
    }
    
    setUserEntry(
      (entries) => {
        return {
          ...entries,
          timerNum: (countDowns.length + 1),
          timerThumb: backDrop
        }
      }
    )

  }

  useEffect(
    ()=> {
      let mainDom = document.body
        if(overfloat === true){
          mainDom.style.overflowY = "auto"
        }else{
          mainDom.style.overflowY = "hidden"
        }
    }, [overfloat]
  )

  localStorage.setItem("todosCountDown", JSON.stringify(countDowns));

  // functions to start timer functions

  let myCountDowns

  if(closeFormBool === false){
    myCountDowns = []
  }else{
    myCountDowns = countDowns.map((timer) => {
      return <Counter deleteCount={deleteItem} saveDet={saveDetails} changeDet={changeDetails} key={timer.timerNum} timerInfos={timer} allCounts={countDowns} ftp={fetchNewDrop} />
    })
  }

  

  // function to edit each timer

  function changeDetails(e, timerId) {
    const {name, value} = e.target;
    
    let allData = countDowns.map((data) => {
      return data.timerNum !== timerId ? data : {...data, [name]: value}
    })

    setCountDowns(
      () => {
        return allData
      }
    )

  }

  function saveDetails(e){
    e.preventDefault();
  }

  // function delete timer app
  function deleteItem(timerId) {

    let filteredItem = countDowns.filter((item) => {
      return item.timerNum !== timerId ? item : false
    })

    setCountDowns(
      () => {
        return filteredItem
      }
    )
  }

  async function fetchNewDrop(e, id){
    let {value} = e.target;
    let data;
    try{
      const myKey = `D5Uuj8BTp5wUzFEBuZ2hBxrN9M6op4MyZHS3puOwCO0`;
      const serverResponse = await fetch(`https://api.unsplash.com/search/photos?query=${value.toLowerCase()}&client_id=`+myKey);
      let serverReply = await serverResponse.json()
      data = serverReply.results[0].urls.small;
    }catch{
      data = (`BG/${bGArray[Math.floor(Math.random() * bGArray.length)]}`);
    }
   
    let changedDrop = countDowns.map((counter) => {
      return counter.timerNum !== id ? counter : {...counter, timerThumb: data}
    })

    setCountDowns(
      () => {
        return changedDrop
      }
    )
  }

  return (
    <>

      <div className="App">

        <div className="formBut">
          <AiOutlineAppstoreAdd className='openForm' role="button" tabIndex="0" onClick={closeForm} />
        </div>

        <Form formOpener={closeForm} formDiv={closeFormBool} handleUserEntry={handleEntry} submitFunc={handleSubmit} formEntry={userEntry} apiCall={getBackDrop} />

        <div className="counterCont">
          {myCountDowns}
        </div>

        <Footer />
      </div>

    </>
  );
}

export default App;
