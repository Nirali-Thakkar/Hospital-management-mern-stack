import React from 'react'
import Hero from "../components/Hero"
import  Biography from "../components/Biography"
import Departments from "../components/Department"
import MessageForm from "../components/MessageForm"


const Home = () => {
  return (
    <>

    <Hero title={"Welcome To ZeeCare Medical Institute | Your Trusted Health Provider"} imageUrl={"/hero.png"} />
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home