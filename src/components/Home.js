import React, { useEffect , useRef } from 'react'
import logo from "../components/assets/logo.png";
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import startSound1 from './sounds/new-theme.mp3'
import startSound2 from './sounds/kbc-theme.wav'
import QUESTIONSDATAHINDI from '../components/Questiondatahindi.js'
import QUESTIONSDATA from '../components/Questiondata.js';

export default function Home(props) {
  const [themeSound1] = useSound(startSound1);
  const [themeSound2] = useSound(startSound2);

  useEffect(() => {
    themeSound1()
  })

  let chooseQuestion = (e) => {
    let English = document.getElementById("English").checked;
    let Hindi = document.getElementById("Hindi").checked;
    if (English === true) {
      e.preventDefault();
      props.setQuestionData(QUESTIONSDATA);
    }
    if (Hindi === true) {
      e.preventDefault();
      props.setQuestionData(QUESTIONSDATAHINDI);
    }
    else {
      e.preventDefault();
      props.setQuestionData(QUESTIONSDATA);
    }
  }
  const userName = useRef(null);
  let userValue = (e) =>{
    e.preventDefault();
    props.setUserName(userName.current.value);
  }

  function introSound() {
    themeSound2()
  }
  return (
    <>
      <div className="container home1">
        <div className="menu_option">
          <div className="left_menu flex">
            <div className="menu_box">
              <span className="material-symbols-outlined">
                home
              </span>
            </div>
          </div>
          <div className="right_menu flex">
            <div className="menu_box">
              <span className="material-symbols-outlined">
                share
              </span>
            </div>
          </div>
        </div>
        <div className="home_box">
          <div className="left_content flex">
            <div className="left_content_box flex">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="right_content flex">
            <div className="right_content_box">
              <div className="language_box m1 flex">
                <div className="language_option">
                  <div className="option flex">
                    <input type="radio" name="language" id="English" />
                    <label htmlFor="language">English</label>
                  </div>
                  <div className="option flex">
                    <input type="radio" name="language" id="Hindi" />
                    <label htmlFor="language">Hindi</label>
                  </div>
                </div>
              </div>
              <div className="user_box m1 flex">
                <div className="username_box">
                  <input onChange={userValue} type="text" id="userName" ref={userName} placeholder='Enter Your Name' />
                </div>
              </div>
              <div className="submit_box m1 flex">
                <button  >HighScore</button>
                <button onClick={chooseQuestion} id='playBtn'>
                  <Link onClick={introSound} to="/play">Play</Link>
                </button>
                {/* <button>Play */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container hidden">
        <h1>Rotate Your Phone</h1>
        <span className="material-symbols-outlined">
          screen_rotation
        </span>
      </div>
    </>
  )
}
