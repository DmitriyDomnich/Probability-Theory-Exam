export class ExamHandler {

    array = [];
    
    constructor(matOG, dispersion, length) {
        this.matOG = matOG;
        this.dispersion = dispersion;
        let dSum = 0, dRandValue = 0;
        for (let n = 0; n < length; n++) {
            dSum = 0;
            for (let i = 0; i <= 12; i++) {
                let r = Math.random();
                dSum += r;
            }
            dRandValue = +(matOG + dispersion * (dSum - 6)).toFixed(3);
            this.array.push(dRandValue);
        }
        console.log(this.array);
        this.array.sort((a, b) => a - b);
    }
    getMatExpectationMark() {
        return +(this.array.reduce((acc, curr) => {
            return acc + curr;
        }, 0) / this.array.length);
    }
    getDispersionMark() {
        const matExpectMark = this.getMatExpectationMark();

        return +(this.array.reduce((acc, curr) => {
            // console.log(acc);
            return acc + Math.pow((curr - matExpectMark), 2);
        }, 0) / this.array.length);
    }
    getStandartDeviation() {
        return Math.sqrt(this.getDispersionMark());
    }
    getMedian() {
        if (this.array.length % 2 === 0) { // 0 1 2 3 4 5 6 7 8 9
            return (this.array.sort((a, b) => a - b)[this.array.length / 2] + this.array[(this.array.length / 2) - 1]) / 2;
        }
        return this.array[(this.array.length / 2 - 1)];
    }
    getQuartiles(quarts, isWithCensorship) {
        if (!isWithCensorship) {
            return quarts.map(quart => {
                let index = Math.floor(((this.array.length + 1) * quart));
                index--;
                return  {
                    index: index,
                    value: this.array[index]
            }});
        }
        const slicedCount = Math.floor(this.array.length * 2 / 100);
        const censoredArr = this.array.slice(slicedCount, this.array.length - slicedCount);
        return quarts.map(quart => {
            let index = Math.floor((censoredArr.length + 1) * quart);
            index--;
            return {
                index: index,
                value: this.array[index]
            }
        });
    }
    getRavnFuncValues() {
        return (1 / ((this.array[this.array.length - 1]) - this.array[0])).toFixed(2);
    }
    getNormPlotnValues() {
        console.log(this.matOG, 'matOG');
        const deviation = this.getStandartDeviation();
        console.log(deviation, 'deviation');
           
        return this.array.map(num => {        
            const exp = Math.exp(-1 * (Math.pow((num - this.matOG), 2)/(2 * Math.pow(this.getStandartDeviation(), 2))));
            return (1 / (deviation * Math.sqrt(2 * Math.PI))) * exp;
        });
    }
    getPokazPlotn(parametrRozpodilu) {
        return this.array.map(val => val < 0 ? 0 : parametrRozpodilu * Math.exp(-1 * (parametrRozpodilu * val)));
    }
    getPokazFuncValues(parametr) {
        return this.array.map(val => val < 0 ? 0 : (1 - Math.exp(-1 * (parametr * val))));
    }
    toString() {
        return this.array.join(', ');
    }
}