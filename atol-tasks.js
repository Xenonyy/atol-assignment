// Problem 1
(function getSpecificTriplet(number) {
  for (let a = 1; a < number; a++) {
    for (let b = a; b < number; b++) {
      let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      if (a + b + c === number) {
        const triplets = {
          a: a,
          b: b,
          c: c,
        };
        console.table(triplets);
        console.log("Product abc: ", a * b * c);
        return triplets;
      }
    }
  }
})(1000);

// Problem 2
(function getLongestSequence() {
  let sequences = [];
  let maxCount = 0;
  let maxCountNumber = 0;

  for (let a = 1; a <= 1000000; a++) {
    let count = 1;
    let temp = a;

    while (a > 1) {
      if (!sequences[temp]) {
        temp = temp % 2 == 0 ? parseInt(temp / 2) : parseInt(3 * temp + 1);
        count++;
      } else {
        count = count + sequences[temp] - 1;
        break;
      }
    }
    sequences[a] = count;

    if (maxCount < count) {
      maxCount = count;
      maxCountNumber = a;
    }
  }
  const log = {
    "Starting number": maxCountNumber,
    "Chain length": maxCount,
  };
  console.table(log);

  return maxCountNumber;
})();

// Problem 3
(function getLongestSequence() {
  const triangleData = [
    [75],
    [95, 64],
    [17, 47, 82],
    [18, 35, 87, 10],
    [20, 04, 82, 47, 65],
    [19, 01, 23, 75, 03, 34],
    [88, 02, 77, 73, 07, 63, 67],
    [99, 65, 04, 28, 06, 16, 70, 92],
    [41, 41, 26, 56, 83, 40, 80, 70, 33],
    [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
    [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
    [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
    [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
    [04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23],
  ];

  let sumOfMaxRoute = [];

  const getSumOfMaxRoute = (rowStart, colStart) => {
    sumOfMaxRoute[rowStart] = sumOfMaxRoute[rowStart] || [];
    let sum = triangleData[rowStart][colStart];

    if (sumOfMaxRoute[rowStart][colStart]) {
      return sumOfMaxRoute[rowStart][colStart];
    }
    if (rowStart === triangleData.length - 1) {
      return sum;
    }

    let leftPath = getSumOfMaxRoute(rowStart + 1, colStart);
    let rightPath = 0;

    if (colStart < triangleData[rowStart + 1].length - 1) {
      rightPath = getSumOfMaxRoute(rowStart + 1, colStart + 1);
    }

    sum = leftPath > rightPath ? leftPath + sum : rightPath + sum;
    sumOfMaxRoute[rowStart][colStart] = sum;

    return sum;
  };
  const totalSum = getSumOfMaxRoute(0, 0);

  const log = {
    "Maximum total value form top to bottom:": totalSum,
  };
  console.table(log);
})();

// Problem 4
(function getSpecificPermutation(permutationIndex, arrayOfNumbers) {
  for (let i = 1; i < permutationIndex; i++) {
    let cyclePermutationIndex;
    let largestIndex;

    for (let j = 0; j < arrayOfNumbers.length - 1; j++) {
      if (arrayOfNumbers[j] < arrayOfNumbers[j + 1]) {
        cyclePermutationIndex = j;
      }
    }
    for (let j = cyclePermutationIndex; j < arrayOfNumbers.length; j++) {
      if (arrayOfNumbers[cyclePermutationIndex] < arrayOfNumbers[j]) {
        largestIndex = j;
      }
    }

    let temp = arrayOfNumbers[cyclePermutationIndex];
    arrayOfNumbers[cyclePermutationIndex] = arrayOfNumbers[largestIndex];
    arrayOfNumbers[largestIndex] = temp;
    let beginning = cyclePermutationIndex + 1;
    let end = arrayOfNumbers.length - 1;

    while (beginning < end) {
      temp = arrayOfNumbers[beginning];
      arrayOfNumbers[beginning] = arrayOfNumbers[end];
      arrayOfNumbers[end] = temp;
      beginning += 1;
      end -= 1;
    }
  }

  const specifiedPermutation = arrayOfNumbers.join("");
  const log = {
    "Specified Permutation": specifiedPermutation,
  };
  console.table(log);

  return specifiedPermutation;
})(1000000, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Problem 5
const findPrimes = (range) => {
  let numbers = [1];
  let currentPrime = 2;
  let primesArr = [2];

  while (currentPrime < range) {
    for (let i = 1; i <= range && currentPrime * i <= range; i++) {
      numbers[currentPrime * i - 1] = currentPrime * i;
    }
    while (numbers[currentPrime - 1] !== undefined) {
      currentPrime++;
    }
    primesArr.push(currentPrime);
  }

  return primesArr;
};
const log10 = Math.log(10);
const orderNumbers = (number) => {
  return (
    ((number / 10) >> 0) +
    (number % 10) * Math.pow(10, Math.floor(Math.log(number) / log10))
  );
};

(function getCircularPrimes(range) {
  const primes = findPrimes(range);

  const hashedPrimes = primes.reduce((memo, prime) => {
    memo[prime] = true;
    return memo;
  }, []);

  const circularPrimes = primes.filter((prime) => {
    let currentNumber = prime;
    while ((currentNumber = orderNumbers(currentNumber)) !== prime) {
      if (!(currentNumber in hashedPrimes)) {
        return false;
      }
    }
    return true;
  });

  console.log(`All circular primes below ${range}:`, circularPrimes);

  return circularPrimes;
})(1000000);
