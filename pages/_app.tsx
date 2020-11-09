import '../styles/globals.css'
import {mobileOperatorListInit,interfaceLanguage} from '../components/init'
import {useState} from "react";
import Context from '../components/context'
import {mobileOperatorListInterface} from "../components/interfaces";



function MyApp({ Component, pageProps }) {
    let [currentLanguage,setCurrentLanguage]=useState<string>("ENG")
    let [mobileOperatorList,setMobileOperatorList]=useState<mobileOperatorListInterface[]>(mobileOperatorListInit)
    let langList=Object.keys(interfaceLanguage)
        .map((key,index)=>{return {key:key,displayName:interfaceLanguage[key].DISPLAY_NAME}})

    return (<Context.Provider value={{
               language:interfaceLanguage[currentLanguage],
               mobileOperatorList:mobileOperatorList,
               currLang:currentLanguage,
               langList:langList,
               setLanguage:setCurrentLanguage,
               setMobileOperatorList:setMobileOperatorList
             }
          }>
          <Component {...pageProps}
          />
     </Context.Provider>)
}

export default MyApp