function convertToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let a = num;
  num = "";

  for (let i = 0; i < values.length; i++) {
    while (a >= values[i]) {
      num += numerals[i];
      a -= values[i];
    }
  }

  return num;
}
