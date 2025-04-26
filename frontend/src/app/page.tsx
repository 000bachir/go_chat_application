"use client"
import * as React from "react"
import Navbar from "@/components/Navbar/Navbar"
import HeroPage from "@/components/Hero/Hero"
import About from "@/components/About/About"

const HomePage = () => {
  return(
    <>
        <Navbar />
        <HeroPage />
        <About />
    </>
  )
}

export default HomePage