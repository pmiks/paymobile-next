

export const getRandomInt=(min:number=0, max:number=100):number=> Math.floor(Math.random() * (max - min)) + min;

export const maskPhone=(str:string,pref:string="+7"):string=>
    pref+str.replace(/^[7,8]/g,"").substring(0, 10).replace(/^(\d{3})(\d)/g,"($1) $2")
    .replace(/^(.{9})(\d)/g,"$1-$2").replace(/^(.{12})(\d)/g,"$1-$2");
