import {serverAnswerInterface} from "../../components/interfaces";
import {serverAnswers} from "../../components/init";
import {getRandomInt} from "../../components/functions";

export default function sendpay (req,res){
    let serverData=serverAnswers[getRandomInt(1,3)]
    serverData.timeRequest=getRandomInt(5000,15000)
    res.statusCode=serverData.status
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify({
        data:serverData.data
    }))
}