
export const getRandomInt=(min:number=0, max:number=100):number=> Math.floor(Math.random() * (max - min)) + min;

export const maskPhone=(str:string,pref:string="+7"):string=>
    pref+str.replace(/^[7,8]/g,"").substring(0, 10).replace(/^(\d{3})(\d)/g,"($1) $2")
    .replace(/^(.{9})(\d)/g,"$1-$2").replace(/^(.{12})(\d)/g,"$1-$2");


export const maskPrice=(str:string,min:number=1,max:number=1000,round:boolean=false):string=> {
    let num=str.substring(0, 7)
        .replace(/[.](?=.*[.])/g, "")
        .replace(/[^\d^\.]/g, "")
        .replace(/^0{2}/, "0")
        .replace(/^0(\d)/, "$1")
        .replace(/(\d+)(\.\d{2})(\d*)/, "$1$2")
        .replace(/^\./, "0.")
        .replace(/^(\d{4})(\d)/, "$1.$2")
    return num
}

export const maskName=(str:string,len:number=255):string=>
    str.substring(0,len)
        .replace(/[^A-Za-zА-Яa-я0-9_-\s]/g, "").replace(/[\s+]/g," ").replace(/^\s/,"")

export const maskURL=(str:string,len:number=255):string=>
    str.substring(0,len)
        .replace(/[^\w\d-]/, "")


export const HEXToVBColor=(rrggbb:string):number=> {
    let v=rrggbb.replace(/#/g,"")
    return parseInt(v.substr(4, 2),16) + parseInt(v.substr(2, 2),16) + parseInt(v.substr(0, 2),16);
}

