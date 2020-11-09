import {mobileOperatorListInterface} from "../components/interfaces";
import {MobileOperator} from "../components/mobileOperatorItem";
//import s from  '../styles/mobileOperatorList.module.css'
import {useRouter} from "next/router";
import AppForm from "../components/appform";
import React, {FC, useContext, useState} from "react";
import Context from '../components/context'
import {AddOperatorModal} from "../components/modalAddOperator";
import {FieldNameSC, WindowTitleSC} from "../styles/globalStyle";

type PayModuleT={
    setMobileOperatorList:()=>void
}

export default function PayModule():JSX.Element{
    const {language,mobileOperatorList,setMobileOperatorList}=useContext(Context)
    const router=useRouter()
    const selectMobileOperator = (id:number)=>{
        router.push(`/payform/${id}`)
    }


    const delNewMobileOperator=(i:number)=>{
        console.log(mobileOperatorList)
       let data=mobileOperatorList
       data.splice(i,1)
       setMobileOperatorList([...data])
       console.log(mobileOperatorList)
    }

     return <AppForm>
        <FieldNameSC textAlign={"center"}>{language.TITLE_SELECT_OPERATOR}</FieldNameSC>

        {mobileOperatorList.map((item,i)=>
            <MobileOperator
                isButton={true}
                item={item}
                onClick={()=>{selectMobileOperator(i)}}
                onDelete={(e)=>{delNewMobileOperator(i);e.stopPropagation();}}
                key={i}
            />)}


    </AppForm>
}