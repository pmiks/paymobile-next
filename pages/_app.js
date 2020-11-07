import '../styles/globals.css'
import {mobileOperatorListInit,currentLanguageInit,interfaceLanguage} from '../components/init'
import {useState} from "react";
import Context from './context'



function MyApp({ Component, pageProps }) {
//    let currentLanguageInit=localStorage.getItem('lang')?"ENG"
    let [currentLanguage,setCurrentLanguage]=useState("ENG")
    let [mobileOperatorList,setMobileOperatorList]=useState(mobileOperatorListInit)
    let langList=Object.keys(interfaceLanguage).map((key,index)=>{return {key:key,displayName:interfaceLanguage[key].DISPLAY_NAME}})
    let setLanguage=(lang)=>{
        setCurrentLanguage(lang)
        localStorage.setItem('lang',lang)
    }
    return (<Context.Provider value={{
               language:interfaceLanguage[currentLanguage],
               mobileOperatorList:mobileOperatorList,
               currLang:currentLanguage,
               langList:langList,
               setLanguage:setCurrentLanguage
     }
          }>
          <Component {...pageProps}
                     operators={mobileOperatorList}
                     setMobileOperatorList={setMobileOperatorList}
          />
     </Context.Provider>)
}
// MyApp.componentDidMount=()=>{
//     let lng=localStorage.getItem('lang')
//     if (lng) setCurrentLanguage(lng)
//     alert(lng)
// }

export default MyApp