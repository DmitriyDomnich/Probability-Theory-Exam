import { ExamHandler } from "./ExamHandler.js";

const examHandler = new ExamHandler(1.76, 0.39, 10);


const quarts = examHandler.getQuartiles([0.5, 0.75, 0.9, 0.99], true);
console.log(quarts, 'quarts');
console.log(examHandler);
const ravnPlotnValue = examHandler.getRavnFuncValues();
const arrayClone = JSON.parse(JSON.stringify(examHandler.array));

quarts.toString = function () {
    let resultString = '';
    
    quarts.forEach(quartObj => {
        console.log(quartObj.index);
        resultString += `${quartObj.index} - ${quartObj.value}; `;
    })
    return resultString;
}
arrayClone.unshift(arrayClone[0] - 5, arrayClone[0] - 10, arrayClone[0] - 10);
document.getElementsByTagName('h3')[0].innerHTML = `<span>Массив:</span> ${examHandler.toString()}`;
document.getElementById('matOG').innerHTML = `${document.getElementById('matOG').innerHTML} <span>${examHandler.getMatExpectationMark()}</span>`;
document.getElementById('DISP').innerHTML = `${document.getElementById('DISP').innerHTML} <span>${examHandler.getDispersionMark()}</span>`;
document.getElementById('MEDIANA').innerHTML = `${document.getElementById('MEDIANA').innerHTML} <span>${examHandler.getMedian()}</span>`;
document.getElementById('quartiles').innerHTML = `Квартили: ${quarts.toString()}`;

let ravnPlotn = {
    labels: arrayClone,
    series: [[null, null, null, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue, ravnPlotnValue,ravnPlotnValue,ravnPlotnValue]]
}
let difference = 1 / (examHandler.array.length - 1);

let ravnGraph = {
    labels: arrayClone,
    series: [
        [0, 0, 0, 0, difference, difference * 2, difference * 3, difference * 4, difference * 5, difference * 6, difference * 7,difference * 8, 1, 1, 1]
    ]
}
const pokazPlotnArray = arrayClone.filter(val => val > 0);
pokazPlotnArray.unshift(0);
let pokazPlotnValues = examHandler.getPokazPlotn(3);
let pokazFuncValues = examHandler.getPokazFuncValues(2);
console.log(pokazFuncValues, 'pokazFunc');

let pokazPlotn = {
    labels: pokazPlotnArray,
    series: [
        pokazPlotnValues.filter(val => val)
    ]
}
pokazFuncValues.unshift(0);
let pokazFunc = {
    labels: pokazPlotnArray,
    series: [
        pokazFuncValues.filter(val => val)
    ]
};
console.log(pokazPlotnValues);

new Chartist.Line('#ravnPlotn', ravnPlotn);
new Chartist.Line('#ravnGraph', ravnGraph);
new Chartist.Line('#pokazPlotn', pokazPlotn);
new Chartist.Line('#pokazGraph', pokazFunc);