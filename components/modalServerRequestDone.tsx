import {Modal} from "./modal";
import {FC, useContext} from "react";
import React from 'react';
import {serverAnswerInterface} from "./interfaces";
import styled from 'styled-components'
import {ButtonSC} from "../styles/globalStyle";
import Context from "./context";

type ServerRequestDoneT={
    result:serverAnswerInterface
    active:boolean
    closeWindow:()=>void
    onDone:()=>void
}

export const ServerRequestModalDone:FC<ServerRequestDoneT>=({result,active,closeWindow,onDone})=>{
    const {language}=useContext(Context)

    const ErrorMsg=({children})=>{
        return <>
                <Err>{children}</Err>
                <div><ButtonSC typeName={"error"} onClick={()=>{closeWindow()}}>{language.BTN_OK}</ButtonSC></div>
               </>
        }

     return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <Info>
            {result.status!==200&&<>
                {result.status===0?
                    <ErrorMsg>{language.ERR_SERVER_CONNECTION}</ErrorMsg>:
                    <ErrorMsg>{language.ERR_SERVER_REQUEST} </ErrorMsg>
                }
            </>
            }
            {result.status===200&&<>
                {result.data.isSuccessful?<>
                    <Info>{result.data.answerText} </Info>
                    <ButtonSC typeName={"ok"} onClick={()=>{onDone();closeWindow()}}>Ok</ButtonSC>
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
    padding:1rem;
    margin:2rem;
`

const Info=styled.div`
    font-weight:bold;
    color:black;
    font-size:3rem;
    text-align:center;
    padding:1rem;
    margin:2rem;
`