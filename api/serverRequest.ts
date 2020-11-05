import {serverAnswerInterface} from "../components/interfaces";
import {serverAnswers} from "../components/init";
import {getRandomInt} from "../components/functions";

export const getServerData=(url:String)=> {
    return new Promise<serverAnswerInterface>(function (resolve, reject) {
        console.log(`Запрос на ${url} отправлен...`)
        const serverData: serverAnswerInterface = serverAnswers[getRandomInt(0, 4)]
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