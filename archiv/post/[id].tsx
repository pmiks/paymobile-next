import {useRouter} from 'next/router'
export default function Post(){
    const router=useRouter()
    console.log(router)
    return <><h1>Post by id {router.query.id}</h1></>
}