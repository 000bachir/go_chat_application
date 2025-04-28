"use client"
import * as React from "react"
import Navbar from "@/components/Navbar/Navbar"
import HeroPage from "@/components/HomePage_components/Hero/Hero"
import About from "@/components/HomePage_components/About/About"
import PeopleReaction from "@/components/HomePage_components/people-reaction/PeopleReaction"
import Redirection from "@/components/HomePage_components/redirection/Redirection"
import Footer from "@/components/Footer/Footer"

const HomePage = () => {
  return(
    <>
        <HeroPage />
        <About />
        <PeopleReaction />
        <Redirection />
    </>
  )
}

export default HomePage