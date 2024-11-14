import Navbar from '@/components/shared/navbar/Navbar'
import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

export default async function Home(){
  const {userId} = await auth();
  return (
    <>
    <Navbar />
    <section className="flex items-center justify-center bg-background h-[90vh]">
    <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="">
          <h1 className="mt-8 text-3xl font-extrabold tracking-normal lg:text-6xl">Manage Tasks with ease</h1>
          <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos minus debitis accusamus iste inventore </p>
        </div>
        <div className="flex justify-center max-w-sm mx-auto mt-10">
          {userId ? (<Link href="/dashboard"><Button size={"lg"} className="w-full bg-primary-500" >Go to Dashboard</Button></Link>) :(<Link href="/sign-up"><Button size={"lg"} className="w-full bg-primary-500" >Sign up for free</Button></Link>)}
      
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

