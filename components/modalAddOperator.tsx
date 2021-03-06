import {Modal} from "./modal";
import {FC, useContext, useEffect, useState} from "react";
import React from 'react';
import {ChromePicker} from 'react-color'
import {fieldCheckInterface, mobileOperatorListInterface} from "./interfaces";
import {HEXToVBColor, maskName, maskPrice, maskURL} from "./functions";
import Context from "./context";
import {ButtonBarSC, ButtonSC, ErrorFieldSC, InputSC, WindowTitleSC} from '../styles/globalStyle'
import styled from 'styled-components'

type InputT={
    name:string
    value:fieldCheckInterface
    placeholder:string
    onChange:(any)=>void
    onBlur?:(any)=>void
    typeName?:string
}

const Input:FC<InputT>=({name,value,onChange,placeholder,typeName="",onBlur=undefined})=>{
    return <>
            <InputSC
                typeName={typeName}
                autoComplete={"off"}
                type={"text"}
                name={name}
                id={name}
                value={value.field}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
            />
            <ErrorFieldSC>{(value.error&&value.dirty)&&value.error}</ErrorFieldSC>
    </>
}

export const AddOperatorModal:FC=()=>{
    const {language,mobileOperatorList,setMobileOperatorList}=useContext(Context)
    const [addModalActive,setAddModalActive]=useState(false)

    let [colorPikerActive,setColorPikerActive]=useState(false)
    let [color,setColor]=useState('#ffffff')

    let [name,setName]=useState<fieldCheckInterface>({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
    let [nameInter,setNameInter]=useState<fieldCheckInterface>({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
    let [commission,setCommission]=useState<fieldCheckInterface>({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
    let [logo,setLogo]=useState<fieldCheckInterface>({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
    let [formValid,setFormValid]=useState<boolean>(false)

    let inverse=HEXToVBColor(color)>500

    const addNewMobileOperator=(data:mobileOperatorListInterface)=>{
        setMobileOperatorList([...mobileOperatorList,data])
    }

    const clearForm=()=>{
        setName({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
        setNameInter({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
        setCommission({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
        setLogo({dirty:false,field:'',error:language.ERR_FIELD_EMPTY_FIELD})
    }

    useEffect(()=>{
            setFormValid((name.error||nameInter.error||commission.error)?false:true)

        },
        [name.error,nameInter.error,commission.error])

    const onSubmit=(formData)=>{
            formData.preventDefault()
            addNewMobileOperator({name:name.field,nameInter:nameInter.field,color:color,logo:logo.field,commission:Number(commission.field),userData:true})
            clearForm()
            setAddModalActive(false)
    }

    const handlerName=(event)=>{
        let field=maskName(event.target.value)
        let err=mobileOperatorList.find(x=>x.name.toUpperCase()===field.replace(/\s*$/,'').toUpperCase())?
            language.ERR_FIELD_OPERATOR_EXIST:(event.target.value.length==0?language.ERR_FIELD_EMPTY_FIELD:'')
        setName({...name,field:field,error:err})
    }

    const handlerInterName=(event)=>{
        let field=maskName(event.target.value)
        let err=mobileOperatorList.find(x=>x.nameInter.toUpperCase()===field.replace(/\s*$/,'').toUpperCase())?
            language.ERR_FIELD_OPERATOR_EXIST:(event.target.value.length==0?language.ERR_FIELD_EMPTY_FIELD:'')
        setNameInter({...nameInter,field:field,error:err})
    }

    const handlerCommission=(event)=>{
        let fee=maskPrice(event.target.value)
        fee=fee.length==0?'0':fee
        setCommission({...commission,field:fee,error:Number(fee)>100?language.ERR_FIELD_BIG_PERCENT:""})
    }

    const handlerLogoURL=(event)=>{
        setLogo({...logo,field:event.target.value})
    }

    const blurHandler=(event)=>{
        let err=event.target.value.length==0
        switch (event.target.name){
            case 'name':
                setName({...name, dirty: true,error:err?language.ERR_FIELD_EMPTY_FIELD:name.error})
                break
            case 'nameInter':
                setNameInter({...nameInter, dirty: true,error:err?language.ERR_FIELD_EMPTY_FIELD:nameInter.error})
                break
            case 'commission': setCommission({...commission, dirty: true,error:err?language.ERR_FIELD_EMPTY_FIELD:commission.error})
        }
    }

    return <>
     <div><ButtonSC typeName={"tool"} onClick={()=>setAddModalActive(true)}>{language.BTN_ADD_MOBILE}</ButtonSC></div>
       {addModalActive&&
        <Modal active={addModalActive} closeWindow={()=>setAddModalActive(false)} clickOverflowClose={true}>
        <div>
             <form>

                 <WindowTitleSC>{language.TITLE_ADD_OPERATOR}</WindowTitleSC>

                 {/*Поле международное имя оператора*/}
                 <Input  name={"name"}
                         value={name}
                         onChange={handlerName}
                         onBlur={blurHandler}
                         placeholder={language.FIELD_NAME_OPERATOR}/>

                 {/*Поле международное имя оператора*/}
                 <Input name={"nameInter"}
                        value={nameInter}
                        onChange={handlerInterName}
                        onBlur={blurHandler}
                        placeholder={language.FIELD_INTER_NAME}/>

                 {/*Поле комиссии*/}
                 <Input name={"commission"}
                        value={commission}
                        onChange={handlerCommission}
                        onBlur={blurHandler}
                        placeholder={language.FIELD_COMMISSION}
                 />

                 {/*Поле выбора цвета*/}
                 <ColorSelectAreaSC
                      onClick={()=>setColorPikerActive(true)}
                      style={{"backgroundColor":`${color}`,"color":`${inverse?"black":"white"}`}} >
                      {language.FIELD_COLOR_CHOICE}
                      <input type="hidden" value={color} name={"color"} id={"color"} />
                 </ColorSelectAreaSC>

                {/*Поле URL логотипа*/}
                 <Input typeName={"small"}
                        name={"logo"}
                        value={logo}
                        onChange={handlerLogoURL}
                        placeholder={language.FIELD_URL_LOGO}
                 />

                {/*Кнопки формы Добавить/Отменить*/}
                <ButtonBarSC>
                    <ButtonSC typeName={'ok'} disabled={formValid ? false : true} onClick={onSubmit}>{language.BTN_ADD}</ButtonSC>
                    <ButtonSC typeName={'cancel'} onClick={()=>{setAddModalActive(false)}}>{language.BTN_CANCEL}</ButtonSC>
                </ButtonBarSC>
             </form>
        </div>

            {/*Окно выбора цвета*/}
            <Modal active={colorPikerActive}
                   closeWindow={()=>setColorPikerActive(false)}
                   clickOverflowClose={false}>
                <ChromePicker color={color}onChange={updatedColor => setColor(updatedColor.hex)}/>
                <ButtonBarSC>
                <ButtonSC style={{"backgroundColor":`${color}`,"color":`${inverse?"black":"white"}`,"borderColor":`${inverse?"black":"white"}`}}
                    onClick={()=>setColorPikerActive(false)}>
                    {language.BTN_PICK}
                </ButtonSC>
                </ButtonBarSC>
            </Modal>
    </Modal>}
    </>
}

export const ColorSelectAreaSC = styled.div`
    display:flex;
    flex:1;
    border: black 1px solid;
    padding:1rem;
    font-size: 3rem;
    font-weight:normal;
    border-radius 5px;
    margin: 2rem 0;
    justify-content: center;
    justify-self: center;
    justify-item: center;  
    cursor:default; 
`