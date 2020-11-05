import {mobileOperatorListInterface, serverAnswerInterface} from "./interfaces";

export const mobileOperatorList:mobileOperatorListInterface[]=[
    {name:'МТС',color:'#ff0000',logo:"https://avatars.mds.yandex.net/get-zen_doc/147743/pub_5ad0c6e9830905287b48ec6d_5ad0c9e54bf161b9d896dece/orig",commission:0},
    {name:'БиЛайн',color:'#FCC917',logo:"https://img.favpng.com/24/17/1/beeline-ojsc-vimpelcom-kaspiytelekom-mts-logo-png-favpng-RJY1Ptz7TuM1Z4thMEmvMNQRQ.jpg",commission:0},
    {name:'Мегафон',color:'#00985f',logo:"https://vk.vkfaces.com/855532/v855532577/69dbb/KSL7OZE0M7Y.jpg",commission:0},
    {name:'ТЕЛЕ2',color:'#000000',logo:"https://i05.fotocdn.net/s118/91415453c302b17d/user_m/2702213240.jpg",commission:0},
    {name:'Ростелеком',color:'#03a1fc',logo:"https://static10.tgstat.ru/channels/_0/d1/d116bc1c8505d75a5625d567026657a0.jpg",commission:0}
]

export const serverAnswers:serverAnswerInterface[]=[
    {status:0,timeRequest:0,data:{isSuccessful:false,answerText:""}},
    {status:200,timeRequest:0,data:{isSuccessful:true,answerText:"Платеж успешно выполнен"}},
    {status:200,timeRequest:0,data:{isSuccessful:false,answerText:"Не удалось выпонить. Проверьте правильность заполнения реквизитов"}},
    {status:500,timeRequest:0,data:{isSuccessful:false,answerText:""}}
]

