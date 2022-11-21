import JSON5 from 'json5';
import { insertAndSort } from './arrayManipulation';
import { addColor } from './colorHandler';
import { capitalizeFirstLetter, handleSelectString } from './strManipulation';

export const codeParse = (textBlock:any) => {
  let convertedCode = '[' + textBlock.split('\n').join(',') + ']';
  try {
    convertedCode = JSON5.parse(convertedCode);
    return convertedCode;
  } catch (error) {
    alert('Check your input code for errors!');
    return null;
  }
};

export const processCode = (codeBlock:any) => {
  let isStarted = false;
  let startTime = 0;
  let chartData = [];
  let group = [];
  let select = [];
  let begin = 0;
  let end = 0;
  let groupName:any = [];

  for (let i = 0; i < codeBlock.length; i++) {
    let lineOfCode = codeBlock[i];

    if (lineOfCode.type === 'start') {
      isStarted = true;
      chartData = [];
      startTime = lineOfCode.timestamp;
      group = lineOfCode.group;
      select = lineOfCode.select;
    }
    else if (lineOfCode.type === 'span') {
      begin = lineOfCode.begin;
      end = lineOfCode.end;
    }
    else if (lineOfCode.type === 'data' && isStarted === true) {
      groupName = [];
      for (let j = 0; j < group.length; j++) {
        groupName.push(capitalizeFirstLetter(lineOfCode[group[j]]));
      }
      groupName = groupName.join(' ');

      for (let j = 0; j < select.length; j++) {
        let serieName = groupName + ' ' + handleSelectString([select[j]]);

        if (lineOfCode[select[j]] !== undefined) {
          let index = chartData.findIndex(
            (element) => element.name === serieName
          );

          if (index !== -1) {
            chartData[index].data = insertAndSort(chartData[index].data, {
              timestamp: lineOfCode.timestamp,
              value: lineOfCode[select[j]],
            });
          } else {
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
    else if (lineOfCode.type === 'stop' && isStarted === true) {
      isStarted = false;
    } 
  }

  if (chartData.length !== 0) {
    chartData = addColor(chartData);
  }

  return [chartData, begin, end];
};
