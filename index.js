class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''


    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {

        let computation
        const pre = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if (isNaN(pre) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = pre + cur
                break
            case '-':
                computation = pre - cur
                break
            case '*':
                computation = pre * cur
                break
            case '/':
                computation = pre / cur
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const stringnumber = number.toString()
        const intdigit = parseFloat(stringnumber.split('.')[0])
        const decdigit = stringnumber.split('.')[1]

        let intdisplay
        if (isNaN(intdigit)) {
            intdisplay = ''
        } else {
            intdisplay = intdigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decdigit != null) {
            return `${intdisplay}.${decdigit}`
        } else {
            return intdisplay
        }
    }

    updatedis() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }

}







const numberButtons = document.querySelectorAll('[data-num]')
const operationButton = document.querySelectorAll('[data-op]')
const allclearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-pre-op]')
const currentOperandTextElement = document.querySelector('[data-cur-op]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updatedis()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updatedis()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updatedis()

})
allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updatedis()

})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updatedis()

})