# bignumberjs

JavaScript는 숫자를 기본적으로 64비트 부동소수점으로 처리하는데, 이로 인해 안전한 정수 범위는 ±2^53 - 1(9007199254740991)로 제한된다.  
그 이상의 큰 숫자를 다루거나, 매우 작은 수 또는 소수점 이하의 정밀한 연산을 할 때 문제가 발생할 수 있다.  
이에 BigNumber.js는 이러한 문제를 해결하기 위함이다.

```
const BigNumber = require('bignumber.js');

const num = new BigNumber('12345.6789');

// 문자열로 변환
console.log(num.toString()); // '12345.6789'

// 정수로 변환
console.log(num.integerValue().toString()); // '12345'

// 소수점 이하 자릿수 제한
console.log(num.toFixed(2)); // '12345.68'
```

위처럼 bignumberjs는 JavaScript의 기본 부동소수점 연산에서 발생하는 부정확성을 방지하고, 다양한 숫자 연산, 형식 변환을 제공하기 때문에 많이 사용된다.

## BigInt와 BigNumber.js를 함께 사용

**BigInt**로 큰 정수를 다루고 싶지만, JavaScript의 기본 숫자 연산으로는 정밀도가 부족할 때 BigNumber.js를 사용하여 더 복잡한 연산을 수행할 수 있게 된다.

```
const BigNumber = require('bignumber.js');

const bigNumberValue = new BigNumber('123456789123456789123456789.12345');

// `BigNumber`를 `BigInt`로 변환 (정수 부분만 남김)
const bigIntValue = BigInt(bigNumberValue.integerValue().toString());

console.log(bigIntValue); // 123456789123456789123456789n
```
