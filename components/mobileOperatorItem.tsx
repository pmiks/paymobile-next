import {mobileOperatorListInterface} from "./interfaces";
import React, {FC, useContext} from "react";
import styled from 'styled-components'
import {HEXToVBColor} from "./functions";
import Context from "./context";

type TMobileOperator={
    item:mobileOperatorListInterface
    onClick:()=>void
    onDelete:(any)=>void
    isButton?:boolean
}

export const MobileOperator:FC<TMobileOperator>=({item,onClick,onDelete,isButton=false})=>{
    let {currLang}=useContext(Context)
    let inverse=HEXToVBColor(item.color)>500
    return <Item isButton={isButton}
                 bgColor={item.color}
                 borderColor={inverse?"gray":"white"}
                 onClick={onClick}
            >
            <ItemContent isButton={isButton} fontInverse={inverse}>
                <div style={{'flex':'1','textAlign':'right'}}><Logo src={item.logo} alt=""/></div>
                <div style={{'flex':'1','textAlign':'center'}}>{currLang!="RU"?item.nameInter:item.name}</div>
                <div style={{'flex':'1'}}></div>
            </ItemContent>

         {item.userData&&isButton&&<DelButton onClick={onDelete}>X</DelButton>}
    </Item>
}


const Logo = styled.img`
  height: 4rem;
  border-radius: 50%;
  margin-right: 1;
`
 const Item = styled.div`
    display: flex;
    position: relative;
    margin: 2rem 5vw;
    border: 1px white solid;
    padding: 0 5vmax;
    border-radius: 15px;
    font-size: 2.9rem;
    align-content: center;
    align-items: center;
    justify-items: stretch;
    justify-content: stretch;
    justify-self: stretch;
    height: 9rem;
    overflow: hidden;
    white-space: nowrap;
    cursor:default;
   
    ${props=>{return `
       background-color:${props.bgColor};
       border-color:${props.borderColor};
       margin:${props.isButton?"1rem 2vw":"0"};
    `}}
    
`
 const DelButton = styled.div`
    display: flex;
    position: absolute;
    padding:0;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 2.2rem;
    right: 1vw;
    top:1vw;
    color:white;
    background-color: black;
    border:1px white solid;
    justify-self: center;
    justify-content: center;
    justify-items: center;

    &:hover{
        transform: scale(1.1);
    }
  `

const ItemContent = styled.div`
    display:flex;
    flex: 1;
    flex-direction:row;
    justify-self: center;
    justify-content: center;
    justify-items: center;
    ${props=>{return props.fontInverse?`color: black;`:`color: white;`}}
    ${props=>{return props.isButton?`&:hover {transform: scale(1.2);}`:`&:hover {transform: none;}`}}
`
