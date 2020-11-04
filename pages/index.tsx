import {mobileOperatorListInterface} from "../components/interfaces";
import {MobileOperator} from "../components/mobileOperatorItem";
import {mobileOperatorList} from "../components/init";
import s from  '../styles/mobileOperatorList.module.css'
import {useRouter} from "next/router";
import {number} from "prop-types";
import AppForm from "../components/appform";

export default function index(){
    const router=useRouter()
    const selectMobileOperator = (id:number)=>{
        router.push(`/payform/${id}`)
        console.log(id)
    }
    return <AppForm><div className={s.mobileListHeader}>Выберите оператора:</div>
        {mobileOperatorList.map(item=><MobileOperator item={item} onClick={selectMobileOperator}/>)}

    </AppForm>
}