import AppForm from "../components/appform";
import {WindowTitleSC} from "../styles/globalStyle";
import Context from "../components/context";
import {useContext} from 'react'

export default function PageNotFound(){
    let {language}=useContext(Context)

    return <AppForm>
        <WindowTitleSC>{language.ERR_404}</WindowTitleSC>
    </AppForm>
}