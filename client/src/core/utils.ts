const localeNumber = (number) => Number(number).toLocaleString("ko-KR");

const fixedFloat = (number, digit) => parseFloat(number).toFixed(digit);

const delay = (ms) => new Promise<void>((res) => setTimeout(() => res(), ms));

export { localeNumber, fixedFloat, delay };
