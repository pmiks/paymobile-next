import '../styles/globals.css'
import {mobileOperatorListInit,interfaceLanguage} from '../components/init'
import {useState} from "react";
import Context from '../components/context'
import {mobileOperatorListInterface} from "../components/interfaces";



function MyApp({ Component, pageProps }) {
//    let currentLanguageInit=localStorage.getItem('lang')?"ENG"
    let [currentLanguage,setCurrentLanguage]=useState<string>("ENG")
    let [mobileOperatorList,setMobileOperatorList]=useState<mobileOperatorListInterface[]>(mobileOperatorListInit)
    let langList=Object.keys(interfaceLanguage).map((key,index)=>{return {key:key,displayName:interfaceLanguage[key].DISPLAY_NAME}})
    // let setLanguage=(lang)=>{
    //     setCurrentLanguage(lang)
    //     localStorage.setItem('lang',lang)
    // }
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
//                     setMobileOperatorList={setMobileOperatorList}
          />
     </Context.Provider>)
}

// MyApp.componentDidMount=()=>{
//     let lng=localStorage.getItem('lang')
//     if (lng) setCurrentLanguage(lng)
//     alert(lng)
// }

export default MyApp