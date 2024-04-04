import React, { useState, useRef, useEffect } from "react";
import '../../styles/home.css'
import Typewriter from "typewriter-effect";
import Image from 'next/image';
import Logo from '../../assets/logo.png'
import { LuSendHorizonal } from "react-icons/lu";
import { IoArrowBackOutline } from "react-icons/io5";
import Join from "@/components/join";
import Create from "@/components/create";

export default function HomePage() {
    const [chatOpend, setChatOpened] = useState(true);
    const [currentChatName, setCurrentChatName] = useState('');
    const [toggle, setToggle] = useState(false);
    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);
    const [bgBlur, setBgBlur] = useState(false);

    const createActive = () => {
        setCreate(true);
        setJoin(false);
        setBgBlur(true);
    }

    const joinActive = () => {
        setCreate(false);
        setJoin(true);
        setBgBlur(true);
    }

    const setChatFunc = (status:any, value:any) => {
        setChatOpened(status);
        setCurrentChatName(value);
        setToggle(true);
    }

    const joinRef = useRef();
    const createRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event:any) => {
        if (joinRef.current && !joinRef.current.contains(event.target)) {
            setJoin(false);
            setBgBlur(false);
        }
        if (createRef.current && !createRef.current.contains(event.target)) {
            setCreate(false);
            setBgBlur(false);
        }
    };

    return (
        <div className="homePage">
            <div className="homeNavbar">
                <div className="webName">
                    <Image src={Logo} height={22} alt="Not found" />
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("ProximiChat")
                                .pauseFor(1000)
                                .start();
                        }}
                    /></div>
                <div className="navBarOptions">
                    <button className="createGroup" onClick={joinActive}>Join</button>
                    <button className="createGroup" onClick={createActive}>Create</button>
                    <div className="profileCircle"></div>
                </div>
            </div>
            <div className={`homeBody${bgBlur ? ' blurClick' : ''}`}>
                <div className={`listChat${toggle ? ' notshow' : ''}`}>
                    <div className="person" onClick={() => setChatFunc(true, 'Anand Kumar Singh')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Anand Kumar Singh</div>
                    </div>
                    <div className="person" onClick={() => setChatFunc(true, 'Anish Kumar Sinha')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Anish Kumar Sinha</div>
                    </div>
                    <div className="person" onClick={() => setChatFunc(true, 'Ajay Bhakar')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Ajay Bhakar</div>
                    </div>
                    <div className="person" onClick={() => setChatFunc(true, 'Aayush Kumar')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Aayush Kumar</div>
                    </div>
                    <div className="person" onClick={() => setChatFunc(true, 'Adi Jain')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Adi Jain</div>
                    </div>
                    <div className="person" onClick={() => setChatFunc(true, 'Ankur De')}>
                        <div className="profileCircleChat"></div>
                        <div className="personName">Ankur De</div>
                    </div>
                </div>
                <div className={`chatBox${toggle ? '' : ' notshow'}`}>
                    {chatOpend ? (<div className="pastChat">
                        <div className="backChatList"><IoArrowBackOutline size={30} style={{ color: "white", marginLeft: "1rem", marginRight: "1rem" }} onClick={() => setToggle(false)} />
                            {currentChatName && `${currentChatName}`}
                        </div>
                        <div className="prevChat"></div>
                        <div className="typeMessageArea">
                            <div className="inputBox"><input type="text" placeholder="Type a message" /></div>
                            <div className="inputButton"><LuSendHorizonal size={40} style={{ color: "chartreuse" }} /></div>
                        </div>
                    </div>) : (<div className="initialChat">
                        <Image className="chatBoxLogo" src={Logo} height={100} alt="Not found" />
                        <div className="initialChatTagline">Join the Chat Scene Near You</div>
                    </div>)
                    }
                </div>
            </div>
            <div ref={joinRef}>
                {join && (<Join />)}
            </div>
            <div ref={createRef}>
                {create && (<Create />)}
            </div>
        </div>
    );
}
