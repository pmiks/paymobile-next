import s from '../styles/appform.module.css'
import Link from 'next/link'
import {useRouter} from "next/router";
import styled from 'styled-components'
import {useContext} from "react";
import Context from "./context";


export default function AppForm({children}){
    const route=useRouter()
    const {language,currLang,langList,setLanguage}=useContext(Context)

    let handlerSelectLanguage=event=>setLanguage(event.target.value)

    return <FormApp>
        <Head>{language.TITLE_APP}
            <select value={currLang} onChange={handlerSelectLanguage}>
                {
                   langList.map((item,index)=>
                    <option //selected={item.key == currentLang?"selected":""}
                            value={item.key}
                            key={item.key}>{item.displayName}
                    </option>)
                }
            </select>
        </Head>
        <Form>{children}</Form>
        {route.pathname!=="/"&&<Foot><Link href={'/'}><A>&#8592; {language.BTN_BACK_TO_MAIN}</A></Link></Foot>}
    </FormApp>
}

const FormApp = styled.div`
    display: flex;
    flex-direction:column;
`
const Head = styled.div`
    display: flex;
    margin 3vmin;
    padding: 2rem;
    font-size: 2.5rem;
    font-weight:bold;
    justify-content:center;
    border gray 1px solid;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
`

const Form = styled.div`
    margin: 5px 4em;
    border: gray 1px solid;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    padding-bottom: 3em;
 `

const Foot = styled.div`
    padding: 1em;
    font-size: 1.5rem;
    text-align:center;
`

const A = styled.a`
    padding:0.5vmax 2vmax;
    border darkgray 1px solid;
    border-radius:5px;
    font-size: 1rem;
    text-align:center;
    background-color:gray;
`




