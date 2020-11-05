import s from '../styles/appform.module.css'
import Link from 'next/link'
import {useRouter} from "next/router";
import styled from 'styled-components'


export default function AppForm({children}){
    const route=useRouter()
    return <FormApp>
        <Head>Оплата мобильной связи</Head>
        <Form>{children}</Form>
        {route.pathname!=="/"&&<Foot><Link href={'/'}><a>на главную</a></Link></Foot>}
    </FormApp>
}

const FormApp = styled.div`
    display: flex;
    flex-direction:column;
`
const Head = styled.div`
    display: flex;
    margin 3vh;
    padding: 1em;
    font-size: 2rem;
    justify-self: center;
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
    justify-self: center;
    justify-content:center;
`




