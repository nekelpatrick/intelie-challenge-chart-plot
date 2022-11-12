import JSON5 from 'json5';
import { insertAndSort } from './arrayManipulation';
import { addColor } from './colorHandler';
import { capitalizeFirstLetter, handleSelectString } from './strManipulation';

/**Converts the text input block into an object array using JSON5 library */
export const codeParse = (textBlock) => {
  let convertedCode = '[' + textBlock.split('\n').join(',') + ']';
  // convertedCode = JSON5.parse(convertedCode);
  try {
    convertedCode = JSON5.parse(convertedCode);
    // console.log(convertedCode);
    return convertedCode;
  } catch (error) {
    alert('Check your input code for errors!');
    return null;
  }
};

/**Analizes each line of user input code and converts it in data for chart plotting */
export const processCode = (codeBlock) => {
  let isStarted = false;
  let startTime = 0;
  let chartData = [];
  let group = [];
  let select = [];
  let begin = 0;
  let end = 0;
  let groupName = [];

  //read each line of code from user input and process it
  for (let i = 0; i < codeBlock.length; i++) {
    let lineOfCode = codeBlock[i];

    //in case of a 'start' event
    if (lineOfCode.type === 'start') {
      isStarted = true;
      chartData = [];
      startTime = lineOfCode.timestamp;
      group = lineOfCode.group;
      select = lineOfCode.select;
    }
    //In case of 'span' event
    else if (lineOfCode.type === 'span') {
      begin = lineOfCode.begin;
      end = lineOfCode.end;
    }
    //only reads 'data' type after the start event
    else if (lineOfCode.type === 'data' && isStarted === true) {
      groupName = [];
      //based on info about the the grouping, starts joining all the field values
      for (let j = 0; j < group.length; j++) {
        groupName.push(capitalizeFirstLetter(lineOfCode[group[j]]));
      }
      groupName = groupName.join(' '); //eg: ['os','browser'] results in 'Linux Firefox'

      //Check all the available values based on the select array
      //grouping them in pairs {timestamp,value} under the same series name
      for (let j = 0; j < select.length; j++) {
        let serieName = groupName + ' ' + handleSelectString([select[j]]);

        if (lineOfCode[select[j]] !== undefined) {
          //Checks if a given property based on the select array exists
          let index = chartData.findIndex(
            //Checks if there's already an object data for the serieName
            (element) => element.name === serieName
          );

          if (index !== -1) {
            //if positive, pushes the new data for the serie
            chartData[index].data = insertAndSort(chartData[index].data, {
              timestamp: lineOfCode.timestamp,
              value: lineOfCode[select[j]],
            });
          } else {
            //if not (in case of a new serie), pushes a new obj data to the chart data array for that serie
            chartData.push({
              name: serieName,
              data: [
                {
                  timestamp: lineOfCode.timestamp,
                  value: lineOfCode[select[j]],
                },
              ],
            });
          }
        }
      }
    }
    //In case of stop event
    else if (lineOfCode.type === 'stop' && isStarted === true) {
      isStarted = false;
    } //else console.log('failed all');
  }

  //after organizing all the data of user input to an array for chart plot,
  //each series also receives a color property
  if (chartData.length !== 0) {
    chartData = addColor(chartData);
  }

  return [chartData, begin, end];
};
