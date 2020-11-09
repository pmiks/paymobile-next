import {MobileOperator} from "../components/mobileOperatorItem";
import {useRouter} from "next/router";
import AppForm from "../components/appform";
import React, {FC, useContext, useState} from "react";
import Context from '../components/context'
import {FieldNameSC, WindowTitleSC} from "../styles/globalStyle";
import Head from 'next/head'

export default function PayModule(){
    const {language,mobileOperatorList,setMobileOperatorList}=useContext(Context)

    const router=useRouter()

    const selectMobileOperator = (id:number)=>{
        router.push(`/payform/${id}`)
    }

    const delNewMobileOperator=(i:number)=>{
       let data=mobileOperatorList
       data.splice(i,1)
       setMobileOperatorList([...data])
    }

     return <AppForm>
        <Head>
            <title>{language.TITLE_APP}</title>
        </Head>
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