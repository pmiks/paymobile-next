import Link from 'next/link'
import {useRouter} from "next/router";
import styled from 'styled-components'
import {useContext, useState} from "react";
import Context from "./context";
import {AddOperatorModal} from "./modalAddOperator";


export default function AppForm({children}){
    const route=useRouter()

    const {language,currLang,langList,setLanguage}=useContext(Context)
    let handlerSelectLanguage=event=>setLanguage(event.target.value)

    return <FormApp>
        <Status>
            {route.pathname!=="/"?
                <Link href={'/'}><A>&#8592; {language.BTN_BACK_TO_MAIN}</A></Link>:
                <AddOperatorModal/>
            }

            <div>{language.FIELD_NAME_LANGUAGE} <Select value={currLang} onChange={handlerSelectLanguage}>
            {
                langList.map((item,index)=>
                    <option
                        value={item.key}
                        key={item.key}>{item.displayName}
                    </option>)
            }
            </Select>
            </div>
        </Status>

        <Head>{language.TITLE_APP}  </Head>
        <Form>{children}</Form>
        <Foot>Пустовой МС &copy;</Foot>
    </FormApp>
}

const FormApp = styled.div`
    display: flex;
    flex-direction:column;
    margin: 3vmin;
    border: gray 1px solid;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);  
    width:90vw;
    max-width:1024px;
`
const Status= styled.div`
    display: flex;
    padding: 2rem;
    font-size: 2rem;
    font-weight:bold;
    justify-content:space-between;
    background-color:none;
    align-items:center;
    align-content:center;
`

const Select= styled.select`
    font-size: 2rem;
    font-weight:bold;
`

const Head = styled.div`
    padding: 3rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight:bold;
    background-color:#88B6E0;
    margin-bottom: 1rem;
`

const Form = styled.div`
    display: flex;
    flex-direction:column;
    margin: 0 3rem;
    padding-bottom: 3rem;
 `

const Foot = styled.div`
    padding: 1rem;
    font-size: 1rem;
    text-align:center;
    color:white;
    background-color:dimgray;
`

const A = styled.a`
    cursor:default;
    padding:1rem 2rem;
    border darkgray 1px solid;
    border-radius:5px;
    font-size: 2rem;
    text-align:center;
    background-color:dimgray;
    color:white;
`




