import {Modal} from "./modal";
//import modalStyle from "../styles/modalConfirmPay.module.css";
import {FC, useState} from "react";
import React from 'react';
import {serverAnswerInterface} from "./interfaces";
import styled from 'styled-components'
import {ButtonSC} from "../styles/globalStyle";

type ServerRequestDoneT={
    result:serverAnswerInterface
    active:boolean
    closeWindow:()=>void
    onDone:()=>void
}





export const ServerRequestModalDone:FC<ServerRequestDoneT>=({result,active,closeWindow,onDone})=>{
    const ErrorMsg=({children})=>{
        return <>
                <Err>{children} </Err>
                <div><ButtonSC typeName={"error"} onClick={()=>{closeWindow()}}>Ok</ButtonSC></div>
               </>
        }

     return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <Info>
            {result.status!==200&&<>
                {result.status===0?
                    <ErrorMsg>Отсутствует подключение к серверу</ErrorMsg>:
                    <ErrorMsg>Ошибка отправки запроса </ErrorMsg>
                }
            </>
            }
            {result.status===200&&<>
                {result.data.isSuccessful?
                <><Info>{result.data.answerText} </Info>
                <div><ButtonSC typeName={"ok"} onClick={()=>{onDone();closeWindow()}}>Ok</ButtonSC></div>
                </>:
                 <ErrorMsg>{result.data.answerText} </ErrorMsg>
                }
            </>
            }

        </Info>
    </Modal>
}
const Err=styled.div`
    color:red;
    font-size:3rem;
    text-align:center;
`

const Info=styled.div`
    font-weight:bold;
    color:black;
    font-size:3rem;
    text-align:center;
    padding:1rem;
    margin:2rem;
`