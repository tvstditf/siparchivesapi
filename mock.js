const generateRandomId = (length) => {
  const chars =
    "23456789ABCDEFGHIJKLMNPQRSTUWXYZabcdefghijklmnpqrstuwxyz!@#$%^&*";

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";

  for (let i = 0; i < length; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
};

let test = generateRandomId(8);
console.log(test);
