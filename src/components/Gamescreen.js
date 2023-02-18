import React, { useEffect, useState } from 'react'
import aud from '../components/assets/aud1.png'
import fifty from '../components/assets/501.png'
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import Reward from './Reward';
import Lifeline from './Lifeline';
import kailash from './sounds/kailash-check.mp3'
import correct from './sounds/correct.wav'
import wrong from './sounds/wrong.wav'
import beap from './sounds/sounds_beep.wav'
import REWARDLIST from '../components/Rewardlist.js'
import Winning from './Winning';

export default function Gamescreen(props) {
    const [kailashSound] = useSound(kailash)
    const [correctSound] = useSound(correct);
    const [wrongSound] = useSound(wrong);
    const [beapSound] = useSound(beap);
    
    const [question, setQuestion] = useState(props.questionData[0].question);
    const [option1, setOption1] = useState(props.questionData[0].option1);
    const [option2, setOption2] = useState(props.questionData[0].option2);
    const [option3, setOption3] = useState(props.questionData[0].option3);
    const [option4, setOption4] = useState(props.questionData[0].option4);
    const [answer, setAnswer] = useState(props.questionData[0].correct);
    const [index, setIndex] = useState(0)
    const [price, setPrice] = useState(0)
    const [winRate, setwinRate] = useState(90)
    const [loseRate, setLoseRate] = useState(30)
    const [correctBg, setCorrectBg] = useState("")
    const [fdisableBtn, setfdisableBtn] = useState(false)
    const [adisableBtn, setadisableBtn] = useState(false)
    const [click, setClick] = useState(1)
    const [rupeeBtnclick, setrupeeBtnClick] = useState(1)
    const [timer, setTimer] = useState(30)
    const [timerActive, setTimerActive] = useState(true)
    useEffect(()=>{
        let timerValue;
        clearInterval(timerValue);
        let option1Box = document.getElementById("option1Box")
        let option2Box = document.getElementById("option2Box")
        let option3Box = document.getElementById("option3Box")
        let option4Box = document.getElementById("option4Box")
        if (timer === 0) {
            option1Box.style.background = "red"
            option2Box.style.background = "red"
            option3Box.style.background = "red"
            option4Box.style.background = "red"
            setTimeout(() => {
                kailashSound()
                let winningPage = document.getElementById("winningPage");
                winningPage.classList.remove("hidden")
            }, 5000);
        }
        timerValue = setInterval(() => {
            if (timer === 1) {
                setTimerActive(false)
                clearInterval(timerValue);
            }
            if (timerActive === true) {
                setTimer(timer - 1)
            }
            else{
                clearInterval(timerValue);
            }
        }, 1000);
        
        return () => clearInterval(timerValue);
    });

    function checkOption1() {
        checkAnswer("option1Ans", "option1Box");
    }
    function checkOption2() {
        checkAnswer("option2Ans", "option2Box");
    }
    function checkOption3() {
        checkAnswer("option3Ans", "option3Box");
    }
    function checkOption4() {
        checkAnswer("option4Ans", "option4Box");
    }
    function checkAnswer(id, id2) {
        let option = document.getElementById(`${id}`).innerHTML;
        let optionBox = document.getElementById(`${id2}`);
        let ins = 0;
        let li_id_reward = document.getElementById(`li${REWARDLIST[index].id}`)
        let li_id_reward_remove = document.getElementById(`li${REWARDLIST[ins].id}`)
        let rewardMoney = REWARDLIST[index].amount;
        if (answer === option) {
            setTimerActive(false)
            li_id_reward.classList.add("active")
            optionBox.classList.add("correct")
            setCorrectBg("correct")
            correctSound()
            setTimeout(() => {
                optionBox.classList.remove("correct")
                setIndex(index + 1)
                setCorrectBg("")
                setQuestion(props.questionData[index + 1].question)
                setOption1(props.questionData[index + 1].option1)
                setOption2(props.questionData[index + 1].option2)
                setOption3(props.questionData[index + 1].option3)
                setOption4(props.questionData[index + 1].option4)
                setAnswer(props.questionData[index + 1].correct)
                setPrice(rewardMoney);
                if (index !== 0) {
                    li_id_reward_remove.classList.remove("active");
                    ins = ins + 1;
                }
                if (index === props.questionData.length - 2) {
                    setIndex(-1);
                }
                setTimer(30)
                setTimerActive(true)
            }, 3000);
        }
        else {
            wrongSound()
            setTimerActive(false)
            optionBox.classList.add("wrong")
            setCorrectBg("wrong")
            setTimeout(() => {
                kailashSound()
                let winningPage = document.getElementById("winningPage");
                winningPage.classList.remove("hidden")
            }, 5000);
        }
    }

    function toggleClass() {
        setTimerActive(false)
        setrupeeBtnClick(rupeeBtnclick + 1)
        if (rupeeBtnclick === 2) {
            setrupeeBtnClick(1)
            setTimerActive(true)
        }
        let rewardPage = document.getElementById("rewardPage");
        let a = rewardPage.classList.toggle("visible");
        if (a === true) {
            beapSound();
        }
    }
    function audiencePull() {
        setTimerActive(false)
        setClick(click + 1);
        if (click === 2) {
            setadisableBtn(true)
            let audBtn = document.getElementById("audBtn");
            audBtn.style.background = "red";
            setTimerActive(true)
        }
        let audiencePoll = document.getElementById("audiencePoll")
        let a = audiencePoll.classList.toggle("visible");
        if (a === true) {
            beapSound();
        }
        let audResult = document.getElementById("audResult").children;
        let audPerc = document.getElementById("audPerc").children;
        let discPerc = document.getElementById("discPerc").children;
        var winPer = 0;
        var losePer = 0;
        for (let i = 0; i < 4; i++) {
            let randomNo = Math.floor(Math.random() * 4);
            let opt1 = audResult[i].innerText;
            let correctOpt = props.questionData[index].correctOpt
            let optId = audPerc[i].id;
            let discId = discPerc[i].id;
            let opt = document.getElementById(`${optId}`)
            let disc = document.getElementById(`${discId}`)
            if (opt1 === correctOpt) {
                if (randomNo === 0) { winPer = 80; setwinRate(winPer) }
                if (randomNo === 1) { winPer = 70; setwinRate(winPer) }
                if (randomNo === 2) { winPer = 90; setwinRate(winPer) }
                if (randomNo === 3) { winPer = 65; setwinRate(winPer) }
                opt.style.height = `${winRate}%`
                disc.innerText = `${winRate}%`
            }
            else {
                if (randomNo === 0) { losePer = 50; setLoseRate(losePer) }
                if (randomNo === 1) { losePer = 45; setLoseRate(losePer) }
                if (randomNo === 2) { losePer = 40; setLoseRate(losePer) }
                if (randomNo === 3) { losePer = 35; setLoseRate(losePer) }
                opt.style.height = `${loseRate}%`
                disc.innerText = `${loseRate}%`
            }
        }
    }

    let fiftyFifty = () => {
        beapSound();
        let a = option1
        let b = option2
        let c = option3
        let d = option4
        let fiftyBtn = document.getElementById("fiftyBtn");
        fiftyBtn.style.background = "red"
        let randomNo = Math.floor(Math.random() * 3);
        if (answer === a) {
            if (randomNo === 0) {
                setOption2("")
                setOption3("")
            }
            if (randomNo === 1) {
                setOption4("")
                setOption3("")
            }
            if (randomNo === 2) {
                setOption2("")
                setOption4("")
            }

        }
        if (answer === b) {
            if (randomNo === 0) {
                setOption1("")
                setOption3("")
            }
            if (randomNo === 1) {
                setOption4("")
                setOption3("")
            }
            if (randomNo === 2) {
                setOption1("")
                setOption4("")
            }

        }
        if (answer === c) {
            if (randomNo === 0) {
                setOption1("")
                setOption2("")
            }
            if (randomNo === 1) {
                setOption4("")
                setOption2("")
            }
            if (randomNo === 2) {
                setOption1("")
                setOption4("")
            }

        }
        if (answer === d) {
            if (randomNo === 0) {
                setOption1("")
                setOption2("")
            }
            if (randomNo === 1) {
                setOption3("")
                setOption2("")
            }
            if (randomNo === 2) {
                setOption1("")
                setOption3("")
            }

        }
        setfdisableBtn(true)

    }

    return (
        <>
            <div id='gameScreen' className="container">
                <div className="menu_option">
                    <div className="left_menu flex">
                        <Link to="/">
                            <div className="menu_box">
                                <span className="material-symbols-outlined">
                                    home
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="right_menu flex">
                        <button id='fiftyBtn' disabled={fdisableBtn} onClick={fiftyFifty} className="menu_box mr-1">
                            <img src={fifty} alt="" />
                        </button>
                        <button id='audBtn' disabled={adisableBtn} onClick={audiencePull} className="menu_box mr-1">
                            <img src={aud} alt="" />
                        </button>
                        <div className="menu_box mr-1">
                            <span className="material-symbols-outlined">
                                phone_in_talk
                            </span>
                        </div>
                        <div className="menu_box">
                            <span className="material-symbols-outlined">
                                diamond
                            </span>
                        </div>
                    </div>
                </div>
                <div className="quiz_screen_box">
                    <div className="frame1">
                        <div className="rupees_box">
                            <button id='rupeesBtn' onClick={toggleClass} className="rupees_icon">
                                <span className="material-symbols-outlined">
                                    currency_rupee
                                </span>
                            </button>
                            <div className="rupees_amount flex">
                                <div className="flex">
                                    <span className="material-symbols-outlined">
                                        currency_rupee
                                    </span>
                                    <div>{price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame2">
                        <div className="light_container flex">
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`timer_circle flex `}>
                                <h1>{timer}</h1>
                            </div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                            <div className={`circle ${correctBg}`}></div>
                        </div>
                    </div>
                    <div className="frame3">
                        <div className="question_container">
                            <div className="line"></div>
                            <div className="question_screen">
                                <div className="questions flex">
                                    {question}
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="frame4">
                        <div className="option_container">
                            <div className="option_box_1">
                                <div className="option_box opt1 flex">
                                    <div className="line"></div>
                                    <button onClick={checkOption1} id='option1Box' className="option_screen flex">
                                        <div className="option_no">A.</div>
                                        <div id='option1Ans' className="option_key">{option1}</div>
                                    </button>
                                    <div className="line"></div>
                                </div>
                                <div className="option_box flex">
                                    <div className="line"></div>
                                    <button onClick={checkOption2}
                                        id='option2Box' className="option_screen flex">
                                        <div className="option_no">B.</div>
                                        <div id='option2Ans' className="option_key">{option2}</div>
                                    </button>
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="option_box_2">
                                <div className="option_box opt1 flex">
                                    <div className="line"></div>
                                    <button onClick={checkOption3} id='option3Box' className="option_screen flex">
                                        <div className="option_no">C.</div>
                                        <div id='option3Ans' className="option_key">{option3}</div>
                                    </button>
                                    <div className="line"></div>
                                </div>
                                <div className="option_box flex">
                                    <div className="line"></div>
                                    <button onClick={checkOption4} id='option4Box' className="option_screen flex">
                                        <div className="option_no">D.</div>
                                        <div id='option4Ans' className="option_key">{option4}</div>
                                    </button>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Reward />
            <Lifeline />
            <Winning price={price} userName = {props.userName} />
            <div className="container hidden">
                <h1>Rotate Your Phone</h1>
                <span className="material-symbols-outlined">
                    screen_rotation
                </span>
            </div>
        </>
    )
};
