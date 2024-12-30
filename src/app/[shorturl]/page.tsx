import {redirect} from 'next/navigation'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongob'

const Page = async ({params}:any) => {
  const shorturl = await params.shorturl
  const client = await clientPromise;
  const db = client.db('bitlinks')
  const collection = db.collection('url')

  const doc = await collection.findOne({shorturl:shorturl})

  if(shorturl == "github"){

  }
  else if(doc){
    redirect(doc.url)
    // return NextResponse.rewrite(new URL(doc.url, shorturl))
  }
  else
  {
    redirect(`${process.env.NEXT_PUBLIC_HOST}`)
  }
  
  return (
    <div>
     my post: {shorturl}
    </div>
  )
}

export default Page
