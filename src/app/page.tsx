import Footer from '@/layouts/footer'
import Navbar from '@/layouts/navbar'
import { TextField } from '@mui/material'
import Image from 'next/image'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Organisation from './organisation-components/organisation'


export default function Home(){

  return (

    <div className="">
      <div className="relative">
        <div className="lg:hidden">
          <img src="/images/AU_MainMobile_HomepageBanner_Final_fba897a5-d8bc-49d9-b187-8b9c87a2361c.webp" alt="hero" className="w-full" />
        </div>
        <div className="hidden lg:block">
          <div className="flex">
          <img style={{}} src="/images/AU_MainDesktop_HomepageBanner_LEFTSIDE_6085701b-dbd9-49f8-b2b6-379b8a38278d.webp" alt="hero" className="flex-none w-6/12	" />
          <img style={{}}  src="/images/AU_MainDesktop_HomepageBanner_RIGHTSIDE_5743db3a-8c8c-4558-a6de-8c9184b854c1.webp" alt="hero" className="w-6/12	" />
          </div>
        </div>
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TextField id="search" label="Search" variant="filled" />
        </div>

      </div>

      <div className="mt-20">
        <Organisation/>
      </div>
    </div>
  )
}