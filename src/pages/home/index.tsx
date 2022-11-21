import "./index.css"

import { Header } from "../../components/header"
import { UserInput } from "../../components/userInput"
import { Chart } from "../../components/chart"
import { Footer } from "../../components/footer"

import { SetStateAction, useEffect, useState } from "react"
import {codeParse, processCode } from "../../utils/codeConverter"

export const HomePage = () => {
  
  const [inputData, setInputData] = useState<string>(`{type: 'start', timestamp: 1519862400000,select: ['min_response_time', 'max_response_time'],group: ['os', 'browser']}
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
{type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
{type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
{type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
{type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
{type: 'stop', timestamp: 1519862460000}`);


const [parsedInput, setParsedInput] = useState<any>(null);
const [data, setData] = useState([]);
const [beginInterval, setBeginInterval] = useState(0);
const [endInterval, setEndInterval] = useState(0);

useEffect(() => {
  if (parsedInput !== null) {
    updateData();
  }
}, [parsedInput]);


const handleBtnClick = () => {
  setParsedInput(codeParse(inputData));
  //when parsedInput state changes, it will trigger the useEffect hook
  //calling the updateData() function
};



  const handleInputUpdate = (data:string) => {
    setInputData(data);
  };
  
    const updateData = () => {
      const [chartData, begin, end] = processCode(parsedInput);
      updateChart(chartData, begin, end);
    };

  const updateChart = (chartData: SetStateAction<never[]>, begin: SetStateAction<number>, end: SetStateAction<number>) => {
    setData(chartData);
    setBeginInterval(begin);
    setEndInterval(end);
  };


  return (
    <div className="container-home">
      <Header developerName="Patrick"/>
      <UserInput  onInput={handleInputUpdate} value={inputData}/>
      <Chart data={data} minLimit={beginInterval} maxLimit={endInterval} />
      <Footer generateChart={handleBtnClick}/>
    </div>
  )
}
