function rot13(str) {
  return str.replace(/[A-Z]/g, function (char) {
    return String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65);
  });
}
