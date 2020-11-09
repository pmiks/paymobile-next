import {serverAnswerInterface} from "../components/interfaces";
import {serverAnswers, serverAnswersRUS} from "../components/init";
import {getRandomInt} from "../components/functions";

export const getServerData=(url:String)=> {
    return new Promise<serverAnswerInterface>(function (resolve, reject) {
        console.log(`Запрос на ${url} отправлен...`)
        const serverData: serverAnswerInterface =
            url.toLowerCase().indexOf('/ru/')>-1?serverAnswersRUS[getRandomInt(0, 4)]:serverAnswers[getRandomInt(0, 5)]
        serverData.timeRequest = getRandomInt(3000, 10000)
        console.log(serverData)
        setTimeout(() => {
            resolve(serverData)
        }, serverData.timeRequest)
    })
}

export const getIdTransaction=():string=>{
    return getRandomInt(400000000000,999999999999).toString()
}