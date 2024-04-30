class Subject {
    constructor(title, marks) {
        this.title = title;
        this.marks = marks;
        this.avg = this.getAvg(marks);
    }

    setNormalTitle(str) {
        return str.length > 5 ? str.substring(0, 1).toUpperCase() + str.substring(1) : str.toUpperCase();
    }

    getAvg(marks= this.marks) {
        return this.roundToDecimalPlaces( marks.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/marks.length, 1)
        
    }

    roundToDecimalPlaces(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

}

module.exports = Subject;