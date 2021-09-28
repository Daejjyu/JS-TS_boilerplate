const localeNumber = (number) => Number(number).toLocaleString('ko-KR')

const fixedFloat = (number, digit) => parseFloat(number).toFixed(digit)

const delay = (ms) => new Promise(res => setTimeout(() => res(), ms))

export { getDiffSet, localeNumber, fixedFloat, delay };