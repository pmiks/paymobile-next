import {Modal} from "./modal";
//import modalStyle from "../styles/modalConfirmPay.module.css";
import {FC, useState} from "react";
import React from 'react';
import {serverAnswerInterface} from "./interfaces";
import styled from 'styled-components'

type ServerRequestDoneT={
    result:serverAnswerInterface
    active:boolean
    closeWindow:()=>void
    onDone:()=>void
}

const Err=styled.div`
    color:red;
    font-size:2rem;
    text-align:center;
`

const Info=styled.div`
    color:black;
    font-size:2rem;
    text-align:center;
    padding:1rem;
`



export const ServerRequestModalDone:FC<ServerRequestDoneT>=({result,active,closeWindow,onDone})=>{
    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <Info>
            {result.status!==200&&<>
                {result.status===0?
                    <Err>Отсутствует подключение к серверу</Err>:
                    <Err>Ошибка отправки запроса </Err>
                }
            </>
            }
            {result.status===200&&<>
                {result.data.isSuccessful?
                <Info>{result.data.answerText} </Info>:
                <Err>{result.data.answerText} </Err>
                }
            </>
            }
            <div><button onClick={()=>{onDone();closeWindow()}}>Ok</button></div>
        </Info>
    </Modal>
}