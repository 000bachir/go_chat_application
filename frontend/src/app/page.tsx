"use client"
import * as React from "react"
import Navbar from "@/components/Navbar/Navbar"
import HeroPage from "@/components/Hero/Hero"
import About from "@/components/About/About"
import PeopleReaction from "@/components/people-reaction/PeopleReaction"
import Redirection from "@/components/redirection/Redirection"
import Footer from "@/components/Footer/Footer"

const HomePage = () => {
  return(
    <>
        <Navbar />
        <HeroPage />
        <About />
        <PeopleReaction />
        <Redirection />
        <Footer />
    </>
  )
}

export default HomePage