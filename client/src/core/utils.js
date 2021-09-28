const getDiffSet = (setA, setB) => new Set([...setA].filter(x => !setB.has(x))); // set1 - set2

const localeNumber = (number) => Number(number).toLocaleString('ko-KR')

const fixedFloat = (number, digit) => parseFloat(number).toFixed(digit)

const delay = (ms) => new Promise(res => setTimeout(() => res(), ms))

export { getDiffSet, localeNumber, fixedFloat, delay };