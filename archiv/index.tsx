import Link from 'next/link'

export default function Index(){
    return <AppForm>
        <h1>Hello Next.JS!</h1>
        <div><Link href={'/payform/1'}><a>About</a></Link></div>
        <div><Link href={'/post'}><a>Post</a></Link></div>
        <div><Link href={'/paymobile'}>Оплата мобильной связи</Link></div>
    </AppForm>

}