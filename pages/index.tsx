import {fieldNameInterface, mobileOperatorListInterface} from "../components/interfaces";
import {MobileOperator} from "../components/mobileOperatorItem";
import s from  '../styles/mobileOperatorList.module.css'
import {useRouter} from "next/router";
import AppForm from "../components/appform";
import {useContext, useState} from "react";
import Context from '../components/context'
import {AddOperatorModal} from "../components/modalAddOperator";


export default function index({setMobileOperatorList}){
    const {language,mobileOperatorList}=useContext(Context)
    const router=useRouter()
    const [addModalActive,setAddModalActive]=useState(false)

        const selectMobileOperator = (id:number)=>{
        router.push(`/payform/${id}`)
    }


    const addNewMobileOperator=(data:mobileOperatorListInterface)=>{
        setMobileOperatorList([...mobileOperatorList,data])
    }

    const delNewMobileOperator=(i:number)=>{
        console.log(mobileOperatorList)
       let data=mobileOperatorList
       data.splice(i,1)
       setMobileOperatorList(data)
       console.log(mobileOperatorList)
    }

    return <AppForm>
        <div className={s.mobileListHeader}>{language.TITLE_SELECT_OPERATOR}</div>

        {mobileOperatorList.map((item,i)=>
            <MobileOperator
                item={item}
                onClick={()=>{selectMobileOperator(i)}}
                onDelete={(e)=>{delNewMobileOperator(i);e.stopPropagation}}
                key={i}
            />)}

            <div style={{"textAlign":"right"}}>
                <button className={'tool'} onClick={()=>setAddModalActive(true)}>{language.BTN_ADD_MOBILE}</button>
            </div>

            <AddOperatorModal
                active={addModalActive}
                closeWindow={()=>setAddModalActive(false)}
                onConfirm={addNewMobileOperator}
            />

    </AppForm>
}