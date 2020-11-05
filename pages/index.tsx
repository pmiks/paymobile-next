import {mobileOperatorListInterface} from "../components/interfaces";
import {MobileOperator} from "../components/mobileOperatorItem";
import {mobileOperatorList} from "../components/init";
import s from  '../styles/mobileOperatorList.module.css'
import {useRouter} from "next/router";
import {number} from "prop-types";
import AppForm from "../components/appform";
import {useState} from "react";
import {AddOperatorModal} from "../components/modalAddOperator";

export default function index(){
    const router=useRouter()
    const [addModalActive,setAddModalActive]=useState(false)

    const selectMobileOperator = (id:number)=>{
        router.push(`/payform/${id}`)
        console.log(id)
    }
    const addNewMobileOperator=(data:mobileOperatorListInterface)=>{
        mobileOperatorList.push(data)
    }
    return <AppForm><div className={s.mobileListHeader}>Выберите оператора:</div>
        {mobileOperatorList.map((item,i)=>
            <MobileOperator item={item} onClick={()=>{selectMobileOperator(i)}} key={i}/>)}

            <div style={{"textAlign":"right"}}><button className={'tool'} onClick={()=>setAddModalActive(true)}>Добавить оператора</button></div>
            <AddOperatorModal active={addModalActive} closeWindow={()=>setAddModalActive(false)} onConfirm={addNewMobileOperator}/>
    </AppForm>
}