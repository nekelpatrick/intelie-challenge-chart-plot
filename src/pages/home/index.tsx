import "./index.css"

import { Header } from "../../components/header"
import { UserInput } from "../../components/userInput"
import { Chart } from "../../components/chart"
import { Footer } from "../../components/footer"

export const HomePage = () => {
  return (
    <div className="container-home">
      <Header developerName="Patrick"/>
      <UserInput/>
      <Chart/>
      <Footer/>
    </div>
  )
}
