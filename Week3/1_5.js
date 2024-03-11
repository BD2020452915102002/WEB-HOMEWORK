function checkCashRegister(price, cash, cid) {
  const currencyValues = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  let changeDue = cash - price;
  let totalCID = 0;
  cid.forEach((item) => (totalCID += item[1]));
  totalCID = Math.round(totalCID * 100) / 100;

  if (totalCID < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (totalCID === changeDue) {
    return { status: "CLOSED", change: cid };
  } else {
    let changeArray = [];
    for (let i = cid.length - 1; i >= 0; i--) {
      const currency = cid[i][0];
      const currencyValue = currencyValues[currency];
      let amountAvailable = cid[i][1];
      let changeAmount = 0;

      while (changeDue >= currencyValue && amountAvailable > 0) {
        changeDue -= currencyValue;
        changeDue = Math.round(changeDue * 100) / 100;
        amountAvailable -= currencyValue;
        changeAmount += currencyValue;
      }

      if (changeAmount > 0) {
        changeArray.push([currency, changeAmount]);
      }
    }

    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: changeArray };
  }
}
