import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import {FC, useContext, useEffect, useState} from "react";
import React from 'react';
import {ChromePicker} from 'react-color'
import {useForm} from "react-hook-form";
import {fieldCheckInterface, fieldNameInterface} from "./interfaces";
import {maskName, maskPrice, maskURL} from "./functions";
import {mobileOperatorList} from "./init";
import Context from "../pages/context";

type AddOperatorT={
    active:boolean
 //   data:payDataInterface
    closeWindow:()=>void
    onConfirm:(mobileOperatorListInterface)=>void
//    onCancel:()=>void
}

//export const ConfirmPayModal:FC<ConfirmPayT>=({data,active,closeWindow,onConfirm,onCancel})=>{
export const AddOperatorModal:FC<AddOperatorT>=({active,closeWindow,onConfirm})=>{
    const {language,mobileOperatorList}=useContext(Context)

    let [colorPikerActive,setColorPikerActive]=useState(false)
    let [color,setColor]=useState('#ffffff')

    let {register,handleSubmit}=useForm()

    let [name,setName]=useState<fieldCheckInterface>({dirty:false,field:'',error:'Заполните поле'})
    let [nameInter,setNameInter]=useState<fieldCheckInterface>({dirty:false,field:'',error:'Заполните поле'})
    let [commission,setCommission]=useState<fieldCheckInterface>({dirty:false,field:'',error:'Заполните поле'})
    let [logo,setLogo]=useState<fieldCheckInterface>({dirty:false,field:'',error:'0'})
    let [formValid,setFormValid]=useState<boolean>(false)

    useEffect(()=>{
            if (name.error||nameInter.error||commission.error) setFormValid(false)
                else setFormValid(true)
        },
        [name.error,nameInter.error,commission.error])

    const onSubmit=(formData)=>{
            alert(JSON.stringify(formData))
            onConfirm({name:formData.name,color:formData.color,logo:formData.logo,commisson:Number(formData.logo),userData:true})
            closeWindow()
    }

    const handlerName=(event)=>{
        let field=maskName(event.target.value)
        let err=mobileOperatorList.find(x=>x.name.toUpperCase()===field.toUpperCase())?
            "Оператор с таким именем уже существует":""
        setName({...name,field:field,error:err})
    }

    const handlerInterName=(event)=>{
        let field=maskName(event.target.value)
        let err=mobileOperatorList.find(x=>x.nameInter.toUpperCase()===field.toUpperCase())?
            "Оператор с таким именем уже существует":""
        setNameInter({...nameInter,field:field,error:err})
    }


    const handlerCommission=(event)=>{
        let num=maskPrice(event.target.value)
        let err=Number(num)>100?"Процент должен быть меньше 100":""
        setCommission({...commission,field:maskPrice(event.target.value)})
    }

    const handlerLogoURL=(event)=>{
        setLogo({...logo,field:maskURL(event.target.value)})
    }

    const blurHandler=(id)=>{
        switch (id.target.name){
            case 'name':
                setName({...name, dirty: true})
                break
            case 'nameInter':
                setNameInter({...nameInter, dirty: true})
                break
            case 'commission': setCommission({...commission, dirty: true})
        }
    }

    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph} >
             <form onSubmit={handleSubmit(onSubmit)}>

               <div><input type="text" name={"name"} id={"name"}
                           value={name.field}
                           onChange={handlerName}
                           onBlur={blurHandler}
                           ref={register}  placeholder={language.FIELD_NAME_OPERATOR}/></div>
                 <div>{name.dirty&&name.error&&name.error}</div>
               <div><input type="text" name={"nameInter"} id={"nameInter"}
                             value={nameInter.field}
                             onChange={handlerInterName}
                             onBlur={blurHandler}
                             ref={register}  placeholder={language.FIELD_INTER_NAME}/></div>
                  <div>{nameInter.dirty&&nameInter.error&&nameInter.error}</div>

               <div><input type="text" name={"commission"} value={commission.field}
                           onChange={handlerCommission}
                           onBlur={blurHandler}
                           id={"commission"} ref={register} placeholder={language.FIELD_COMMISSION}/></div>
                 <div>{commission.dirty&&commission.error&&commission.error}</div>

                 <div className={"colorSelect"} onClick={()=>setColorPikerActive(true)} style={{"backgroundColor":`${color}`}} >{language.FIELD_COLOR_CHOICE}
                   <input type="hidden" value={color} name={"color"} id={"color"} ref={register}/>
               </div>

               <div><input
                   style={{"fontSize":"1rem","width":"92%"}}
                   type="text" name={"logo"} value={logo.field} onChange={handlerLogoURL}
                            id={"logo"} ref={register} placeholder={language.FIELD_URL_LOGO}/></div>

                <div style={{"textAlign":"center"}}>
                    <button ref={register}
                            disabled={!formValid}
                            name={"add"}>{language.BTN_ADD}</button>
                 <button name={"cancel"} className={'cancel'} ref={register}>{language.BTN_CANCEL}</button></div>
             </form>
        </div>
        <Modal active={colorPikerActive} closeWindow={()=>setColorPikerActive(false)} clickOverflowClose={false}><ChromePicker
            color={color}
            onChange={updatedColor => setColor(updatedColor.hex)}
        />
            <div style={{"textAlign":"center"}}>
                <button style={{"margin":"0","marginTop":"5px","width":"100%","backgroundColor":`${color}`}}
                        className={'cancel'}
                        onClick={()=>setColorPikerActive(false)}>{language.BTN_PICK}</button></div>
        </Modal>
    </Modal>
}