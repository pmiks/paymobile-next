import React from 'react'
import Router from 'next/router'

export default function Index(){
    const linkClickHandler=()=>{
        Router.push('/')
    }
    return <React.Fragment><h1>About Page</h1>
        <button onClick={linkClickHandler}>Go back to home</button>
        <button onClick={()=>{Router.push('/post')}}>Go to posts</button>
    </React.Fragment>
}