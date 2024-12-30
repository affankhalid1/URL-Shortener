"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const page = () => {

  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setGenerated] = useState("")

  const SanitizeInputurl = (input:string) => {
    let sanitize =  input.replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, '')
    
    if (input.includes('javascript:') || input.includes('data:') || input.includes('vbscript:') || input.includes('file:') ||
    input.includes('ftp:') || input.includes('about:') || input.includes('chrome:') || input.match(/%[0-9A-Fa-f]{2}/) )// Matches percent-encoded characters like '%6A' 
    {
      alert('Invalid URL: Contains unsafe protocol . Donot use these protocols. Use "http://" or "https://" and try again.')
      sanitize = ''
    }

    return sanitize
    
  }
  const SanitizeInputShorturl = (input:string) => {
    let sanitize =   input.replace(/[^a-zA-Z0-9-_@]/g, '')

    
    if (input.includes('javascript:') || input.includes('data:') || input.includes('vbscript:') || input.includes('file:') ||
    input.includes('ftp:') || input.includes('about:') || input.includes('chrome:') || input.match(/%[0-9A-Fa-f]{2}/) )// Matches percent-encoded characters like '%6A' 
    {
      alert('Invalid URL: Contains unsafe protocol . Donot use these protocols. Use "http://" or "https://" and try again.')
      sanitize = ''
    }

    return sanitize
    
  }


  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url.toLowerCase(),
      "shorturl": shorturl.toLowerCase()
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
        seturl("")
        setshorturl("")
        console.log(result)
        alert(result.message)
      })
        
      .catch((error) => console.error(error));
  }

  return (
    <div className='mx-auto max-w-lg bg-purple-100 p-8 my-16 rounded-lg flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
      <div className='flex flex-col gap-4'>

        <input type="text" 
        value={url}
        className='px-4 py-3 focus:outline-purple-600 rounded-md'
        placeholder='Enter your URL' 
        onChange={e => seturl(SanitizeInputurl(e.target.value))}/>

        <input type="text" 
        value={shorturl}
        className='px-4 py-3 focus:outline-purple-600 rounded-md'
        placeholder='Enter your preferred short URL text' 
        onChange={e => setshorturl(SanitizeInputShorturl(e.target.value))}/>
       <div className='flex justify-center'>
       <button onClick={generate} className='bg-purple-500 shadow-lg px-3 py-1 rounded-lg font-bold w-fit text-white '>Generate</button>
       </div>
      </div>

      {generated &&<> <span className='font-bold'>Your Link</span>
      <code> <Link target='blank' href= {generated}>{generated}</Link> 
      </code>
      </>
      }
    </div>
  )
}

export default page
