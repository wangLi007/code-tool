// 关于大数据以及浮点数的处理
import BigNumber from 'bignumber.js';
import _, { curryRight } from 'lodash';

BigNumber.config({ MODULO_MODE: BigNumber.ROUND_DOWN });

export type NumType = string | number | BigNumber;

export function sum(arr: Array<NumType>) {
  return BigNumber.sum.apply(null, arr).toString();
}

export function isZero(num: NumType) {
  if (num == '') return true;
  return toBigNumber(num).isZero();
}

export function plus(
  number: NumType | Array<{ [name: string]: NumType }>,
  initialValue: NumType,
) {
  // 可以传入数组也可以传字符串
  if (_.isArray(number)) {
    return number.reduce((total, currentValue) => {
      if (_.isString(initialValue)) {
        return total.plus(toBigNumber(currentValue[initialValue]));
      }
      return total;
    }, toBigNumber(0));
  } else {
    return toBigNumber(number).plus(toBigNumber(initialValue || 0));
  }
}

export function minus(numbera: NumType, numberb: NumType) {
  return toBigNumber(numbera).minus(toBigNumber(numberb)).toString();
}
export function toPercent(value: NumType, decimalsToAppear?: number) {
  // 转化为百分比

  return `${toBigNumber(value)
    .multipliedBy(toBigNumber(100))
    .toFormat(decimalsToAppear || 2)}%`;
}

export function divPow(value: NumType, decimals: number = 18) {
  // 除法
  return toBigNumber(value).dividedBy(new BigNumber(10).pow(decimals));
}

export function div(value: NumType, value1: NumType) {
  // 根据精度格式化数据
  return toBigNumber(value).dividedBy(toBigNumber(value1));
}
export function multiplie(value: NumType, value1: NumType) {
  // 乘法
  return toBigNumber(value).multipliedBy(toBigNumber(value1));
}
// 精度换算
export function multipliePow(value: NumType, decimals: number) {
  // 根据精度格式化数据
  return toBigNumber(value).multipliedBy(new BigNumber(10).pow(decimals));
}
export function multipliebyDecimals(
  value: NumType,
  decimals: number,
  decimalsToAppear?: number,
) {
  // 根据精度格式化数据
  return toFormat(
    toBigNumber(value).multipliedBy(new BigNumber(10).pow(decimals)),
    decimalsToAppear,
  );
}
export function toBigNumber(val: NumType) {
  return (val = BigNumber.isBigNumber(val) ? val : new BigNumber(val));
}

export function lt(one: NumType, two: NumType) {
  // 比较两个数字的大小
  return toBigNumber(one).isLessThan(toBigNumber(two));
}

export function lte(one: NumType, two: NumType) {
  // 比较两个数字的大小
  return toBigNumber(one).isLessThanOrEqualTo(toBigNumber(two));
}

// 大于
export function gt(one: NumType, two: NumType) {
  return toBigNumber(one).isGreaterThan(toBigNumber(two));
}
// 大于等于
export function gte(one: NumType, two: NumType) {
  return toBigNumber(one).isGreaterThanOrEqualTo(toBigNumber(two));
}
// 最小值
export function minimum(one: NumType, two: NumType) {
  return BigNumber.minimum(one, two);
}
// 绝对值
export function abs(num: NumType) {
  return toBigNumber(num).absoluteValue();
}

// 两数相乘
export function multiplyByTwoValue(
  one: NumType,
  two: NumType,
  decimalsToAppear: number,
) {
  // 根据精度格式化数据
  return toFormat(
    toBigNumber(one).multipliedBy(toBigNumber(two)),
    decimalsToAppear,
  );
}
/**
 * @description 指定保留的小数位数格式化金额字符串,
 * @param digits 保留小数点后digits位
 * @param split 是否分割小数点前千分位
 */
export function fmt(num: NumType, digits: number, split: boolean): string {
  if (Number.isNaN(Number(num))) {
    num = '0';
  }
  if (split) {
    // 格式化千分位
    return toFormat(num, digits);
  }
  // return toBigNumber(num).toFixed(digits, BigNumber.ROUND_DOWN);
  return toFixed(num, digits); // todo 为了解决 精度为负值的情况； 默认向下取值
}
export const curried = curryRight(fmt);

// 保留2位小数且格式化千分位
export const fmt2 = curried(2, true);
// 保留2位小数且不格式化千分位
export const fmt2NoSplit = curried(2, false);
// 保留4位小数且格式化千分位
export const fmt4 = curried(4, true);
// 保留4位小数且不格式化千分位
export const fmt4NoSplit = curried(4, false);

export function toFormat(
  bigNumber: NumType,
  decimalsToAppear: number = 2,
): string {
  return toBigNumber(bigNumber).toFormat(
    decimalsToAppear,
    BigNumber.ROUND_DOWN,
  );
}

export function toFixed(
  bigNumber: NumType,
  decimalsToAppear: number = 2,
  isDown = true,
): string {
  let newNum: string = '0';
  if (gte(decimalsToAppear, 0)) {
    newNum = toBigNumber(bigNumber).toFixed(
      decimalsToAppear,
      isDown ? BigNumber.ROUND_DOWN : BigNumber.ROUND_UP,
    );
  } else {
    const powNum = divPow(1, decimalsToAppear);
    const moduloNum = toBigNumber(bigNumber).modulo(powNum);
    const minusNum = minus(bigNumber, moduloNum);
    newNum = isDown ? minusNum : plus(minusNum, powNum).toString();
  }
  return newNum;
}

/**
 * Match a hex string with no hex prefix (and at least one character).
 */
const HEX_RE = /^[0-9a-fA-F]+$/;

/**
 * Match a base-10 integer.
 */
const DEC_RE = /^[0-9]+$/;

const BIT_MASK_250 = new BigNumber(
  '3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
  16,
);

/**
 * Convert a BigNumber to a 32-byte hex string without 0x prefix.
 */
export function BigNumberToHex32(BigNumber: BigNumber): string {
  return normalizeHex32(BigNumber.toString(16));
}

/**
 * Normalize to a lowercase 32-byte hex string without 0x prefix.
 */
export function normalizeHex32(hex: string): string {
  const paddedHex = stripHexPrefix(hex).toLowerCase().padStart(64, '0');
  if (paddedHex.length !== 64) {
    throw new Error('normalizeHex32: Input does not fit in 32 bytes');
  }
  return paddedHex;
}

/**
 * Generate a random Buffer.
 */
export function randomBuffer(numBytes: number): Buffer {
  const bytes = [];
  for (let i = 0; i < numBytes; i++) {
    bytes[i] = Math.floor(Math.random() * 0xff);
  }
  return Buffer.from(bytes);
}

// ============ Creating BigNumbers ============

/**
 * Convert a hex string with optional 0x prefix to a BigNumber.
 */
export function hexToBigNumber(hex: string): BigNumber {
  return new BigNumber(stripHexPrefix(hex), 16);
}

/**
 * Convert a decimal string to a BigNumber.
 */
export function decToBigNumber(dec: string): BigNumber {
  if (!dec.match(DEC_RE)) {
    throw new Error('decToBigNumber: Input is not a base-10 integer');
  }
  return new BigNumber(dec, 10);
}

/**
 * Convert an integer number to a BigNumber.
 */
export function intToBigNumber(int: number): BigNumber {
  if (!Number.isInteger(int)) {
    throw new Error('intToBigNumber: Input is not an integer');
  }
  return new BigNumber(int, 10);
}

/**
 * Convert a string to a BigNumber equal to the left-aligned UTF-8 representation with a fixed bit length.
 *
 * The specified numBits is expected to be a multiple of four.
 */
export function utf8ToBigNumber(s: string, numBits: number): BigNumber {
  if (numBits % 4 !== 0) {
    throw new Error(
      `utf8ToBigNumber: numBits=${numBits} is not a multiple of four`,
    );
  }
  const buffer = Buffer.from(s);
  const hex = buffer.toString('hex');
  const paddedHex = hex.padEnd(numBits / 4, '0');
  if (paddedHex.length !== numBits / 4) {
    throw new Error(
      `utf8ToBigNumber: Input does not fit in numBits=${numBits} bits`,
    );
  }
  return new BigNumber(paddedHex, 16);
}

// ============ Helper Functions ============

function stripHexPrefix(hex: string): string {
  const hexNoPrefix = hex.replace(/^0x/, '');
  if (!hexNoPrefix.match(HEX_RE)) {
    throw new Error('stripHexPrefix: Input is not a hex string');
  }
  return hexNoPrefix;
}
