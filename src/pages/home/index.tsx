import "./index.css";

import { Header } from "../../components/header";
import { UserInput } from "../../components/userInput";
import { Chart } from "../../components/chart";
import { Footer } from "../../components/footer";

import { SetStateAction, useEffect, useState } from "react";
import { codeParse, processCode } from "../../utils/codeConverter";
import { initialData } from "../../utils/initialData";

export const HomePage = () => {
  const [inputData, setInputData] = useState<string>(initialData);

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
  };

  const handleInputUpdate = (data: string) => {
    setInputData(data);
  };

  const updateData = () => {
    const [chartData, begin, end] = processCode(parsedInput);
    updateChart(chartData, begin, end);
  };

  const updateChart = (
    chartData: SetStateAction<never[]>,
    begin: SetStateAction<number>,
    end: SetStateAction<number>
  ) => {
    setData(chartData);
    setBeginInterval(begin);
    setEndInterval(end);
  };

  return (
    <div className="container-home">
      <Header developerName="Patrick" />
      <UserInput onInput={handleInputUpdate} value={inputData} />
      <Chart data={data} minLimit={beginInterval} maxLimit={endInterval} />
      <Footer generateChart={handleBtnClick} />
    </div>
  );
};
