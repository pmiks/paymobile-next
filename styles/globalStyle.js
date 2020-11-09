import styled from 'styled-components'

export const ButtonSC = styled.button`
    font-size: 2rem;
    border-radius: 5px;
    color: white;
    border: white 1px solid;
    padding: 10px;
    justify-self: center;
    font-weight: bold;
    justify-self: stretch;
    box-sizing: border-box;
    width: 100%; 
    
    &:hover{
        transform: scale(1.1);
    }  
    &:disabled{
        background-color: gray;
        color: lightgray;
    }

   ${props=>{
        switch (props.typeName) {
            case "ok":
                return `background-color: forestgreen`
            case "cancel":
                return ` color: black;
                    background-color:white;
                    border: dimgray 2px solid;`
            case "error":
                return ` color: black;
                    background-color:red;
                    border: dimgray 2px solid;`
            case "tool":
                return ` 
                    background-color:gray;
                    background-color: dimgray;`
        }
        }  
    }
`

export const InputSC = styled.input`
  font-size: 3rem;
  margin: 0.5rem 0;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  width:100%; 
    &:disabled{

    }
   ${props=>{
    switch (props.typeName) {
        case "small":
            return `font-size: 2rem;`
        case "big":
            return `font-size: 5rem;`

    }
}
}
`
export const WindowTitleSC = styled.h1`
  font-size: 3rem;
  margin: 1rem 2rem;
  padding: 5px;
  text-transform:uppercase;
  text-align:center;
 `

export const ErrorFieldSC = styled.div`
  font-size: 1rem;
  height: 1rem;
  margin: 1rem 2rem;
  color:red;
 `

export const FieldNameSC = styled.h1`
    background-color: inherit;
    padding: 0px;
    font-size: 2rem;
    font-weight:bold;
    text-align:left;
     ${props=>{return `text-align:${props.textAlign};`}}
 `

export const ButtonBarSC = styled.div`
  display:flex;
  flex-wrap: nowrap;
  flex-direction:row;
  justifyContent:space-around;
  justifyItems:stretch;
 `

