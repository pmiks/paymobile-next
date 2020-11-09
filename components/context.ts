import React from 'react'
import {interfaceLanguage, mobileOperatorListInit} from "./init";
import {fieldNameInterface, mobileOperatorListInterface} from "./interfaces";

type ContextType={
    language:fieldNameInterface,
    mobileOperatorList:mobileOperatorListInterface[],
    currLang:string,
    langList:{key:string,displayName:string}[],
    setLanguage:(string)=>void,
    setMobileOperatorList:(mobileOperatorListInterface)=>void
}

const Context = React.createContext<ContextType>({
    language:interfaceLanguage["ENG"],
    mobileOperatorList:mobileOperatorListInit,
    currLang:"ENG",
    langList:[{key:"ENG",displayName:"English"}],
    setLanguage:()=>{},
    setMobileOperatorList:()=>{}
})

export default Context