function palindrome(str) {
  str = str
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .split("");
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}
