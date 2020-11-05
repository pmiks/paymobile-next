import s from '../styles/appform.module.css'
import Link from 'next/link'
import {useRouter} from "next/router";
import styled from 'styled-components'


export default function AppForm({children}){
    const route=useRouter()
    return <FormApp>
        <Head>Оплата мобильной связи</Head>
        <Form>{children}</Form>
        {route.pathname!=="/"&&<Foot><Link href={'/'}><A>&#8592; Вернуться на главную</A></Link></Foot>}
    </FormApp>
}

const FormApp = styled.div`
    display: flex;
    flex-direction:column;
`
const Head = styled.div`
    display: flex;
    margin 3vh;
    padding: 1rem;
    font-size: 3rem;
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




