import {Modal} from "./modal";
import modalStyle from "../styles/modalConfirmPay.module.css";
import {FC, useState} from "react";
import React from 'react';
import {ChromePicker} from 'react-color'
import {useForm} from "react-hook-form";

type AddOperatorT={
    active:boolean
 //   data:payDataInterface
    closeWindow:()=>void
    onConfirm:(mobileOperatorListInterface)=>void
//    onCancel:()=>void
}

//export const ConfirmPayModal:FC<ConfirmPayT>=({data,active,closeWindow,onConfirm,onCancel})=>{
export const AddOperatorModal:FC<AddOperatorT>=({active,closeWindow,onConfirm})=>{
    let [colorPikerActive,setColorPikerActive]=useState(false)
    let [color,setColor]=useState('#fff')

    let {register,handleSubmit}=useForm()

    const onSubmit=(formData)=>{
            alert(JSON.stringify(formData))
            onConfirm({name:formData.name,color:formData.color,logo:formData.logo,commisson:Number(formData.logo)})
            closeWindow()
    }

    return <Modal active={active} closeWindow={closeWindow} clickOverflowClose={false}>
        <div className={modalStyle.modalParagraph} >
             <form onSubmit={handleSubmit(onSubmit)}>
               <div> Название оператора</div>
               <div><input type="text" name={"name"} id={"name"} ref={register}/></div>
               <div> Комиссия</div>
               <div><input type="text" name={"commision"} id={"commision"} ref={register}/></div>
               <div className={"colorSelect"} onClick={()=>setColorPikerActive(true)} style={{"backgroundColor":`${color}`}} >Выберите цвет
                   <input type="hidden" value={color} name={"color"} id={"color"} ref={register}/>
               </div>
                  <div>Логотип</div>
                 <div><input type="text" name={"logo"} id={"logo"} ref={register}/></div>
                 <div style={{"textAlign":"center"}}><button>Добавить</button>

                     <button className={'cancel'} onClick={()=>{closeWindow()}}>Назад</button></div>
             </form>
        </div>
        <Modal active={colorPikerActive} closeWindow={()=>setColorPikerActive(false)} clickOverflowClose={false}><ChromePicker
            color={color}
            onChange={updatedColor => setColor(updatedColor.hex)}
        />
            <div style={{"textAlign":"center"}}><button style={{"margin":"0","marginTop":"5px","width":"100%","backgroundColor":`${color}`}} className={'cancel'} onClick={()=>setColorPikerActive(false)}>Выбрать</button></div>
        </Modal>
    </Modal>
}