

export const getRandomInt=(min:number=0, max:number=100):number=> Math.floor(Math.random() * (max - min)) + min;

export const maskPhone=(str:string,pref:string="+7"):string=>
    pref+str.replace(/^[7,8]/g,"").substring(0, 10).replace(/^(\d{3})(\d)/g,"($1) $2")
    .replace(/^(.{9})(\d)/g,"$1-$2").replace(/^(.{12})(\d)/g,"$1-$2");


export const maskPrice=(str:string,min:number=1,max:number=1000,round:boolean=false):string=>
    str.replace(/\D/g,"").substring(0,6).replace(/^(.{4})(\d)/g,"$1.$2");

