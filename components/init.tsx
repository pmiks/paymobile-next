import {
    fieldNameInterface,
    languageDataInteface,
    mobileOperatorListInterface,
    serverAnswerInterface
} from "./interfaces";

export let mobileOperatorListInit:mobileOperatorListInterface[]=[
    {name:'МТС',nameInter:'MTS',color:'#ff0000',logo:"https://avatars.mds.yandex.net/get-zen_doc/147743/pub_5ad0c6e9830905287b48ec6d_5ad0c9e54bf161b9d896dece/orig",commission:0,userData:false},
    {name:'БиЛайн',nameInter:'BeeLine',color:'#FCC917',logo:"https://img.favpng.com/24/17/1/beeline-ojsc-vimpelcom-kaspiytelekom-mts-logo-png-favpng-RJY1Ptz7TuM1Z4thMEmvMNQRQ.jpg",commission:0,userData:false},
    {name:'Мегафон',nameInter:'Megafon',color:'#00985f',logo:"https://vk.vkfaces.com/855532/v855532577/69dbb/KSL7OZE0M7Y.jpg",commission:0,userData:false},
    {name:'ТЕЛЕ2',nameInter:'TELE2',color:'#000000',logo:"https://i05.fotocdn.net/s118/91415453c302b17d/user_m/2702213240.jpg",commission:0,userData:false},
    {name:'Ростелеком',nameInter:'Rostelecom',color:'#03a1fc',logo:"https://static10.tgstat.ru/channels/_0/d1/d116bc1c8505d75a5625d567026657a0.jpg",commission:0,userData:false}
]

export const serverAnswers:serverAnswerInterface[]=[
    {status:0,timeRequest:0,data:{isSuccessful:false,answerText:""}},
    {status:200,timeRequest:0,data:{isSuccessful:true,answerText:"Платеж успешно выполнен"}},
    {status:200,timeRequest:0,data:{isSuccessful:false,answerText:"Не удалось выпонить. Проверьте правильность заполнения реквизитов"}},
    {status:500,timeRequest:0,data:{isSuccessful:false,answerText:""}}
]

export const interfaceLanguage:languageDataInteface={
    RU: {
        DISPLAY_NAME:"Русский",
        BTN_ADD_MOBILE: "Добавить оператора",
        BTN_ADD: "Добавить",
        BTN_PICK:"Выбрать",
        BTN_CANCEL: "Отменить",

        BTN_PAY:"Оплатить",
        BTN_BACK_TO_MAIN:"Вернуться на главную",
        BTN_OK:"Ok",
        FIELD_TRANSACTION_NUMBER:"Номер транзакции",
        FIELD_AMOUNT_PAY:"Сумма платежа",
        FIELD_PHONE_NUMBER:"Номер телефона",
        FIELD_NAME_OPERATOR: "Название оператора",
        FIELD_COMMISSION: "Комиссия %",
        FIELD_COLOR_CHOICE: "Выберите цвет",
        FIELD_URL_LOGO: "URL Логотипа",
        FIELD_INTER_NAME:"Международное название",
        TITLE_APP:"Оплата мобильной связи",
        TITLE_SELECT_OPERATOR:"Выберите оператора:",
        TITLE_CONFIRM_PAY:"Подтверждение платежа",
        MSG_PAYMENT_PROCESSING:"Обработка платежа..."
    },
    ENG: {
        DISPLAY_NAME:"English",
        BTN_ADD_MOBILE: "Add operator",
        BTN_ADD: "Add",
        BTN_CANCEL: "Cancel",
        BTN_PICK:"Pick",
        BTN_PAY:"Pay",
        BTN_BACK_TO_MAIN:"Back to main",
        BTN_OK:"Ok",
        FIELD_TRANSACTION_NUMBER:"Transaction number",
        FIELD_AMOUNT_PAY:"Amount of payment",
        FIELD_PHONE_NUMBER:"Phone Number",
        FIELD_INTER_NAME:"International name",
        FIELD_NAME_OPERATOR: "Operator name",
        FIELD_COMMISSION: "Transfer fee %",
        FIELD_COLOR_CHOICE: "Сhoose color",
        FIELD_URL_LOGO: "Logo URL",
        TITLE_APP:"Payment for mobile communication",
        TITLE_SELECT_OPERATOR:"Select operator:",
        TITLE_CONFIRM_PAY:"Payment confirmation",
        MSG_PAYMENT_PROCESSING:"Payment processing..."
    }

}

