export default function createRandomId(length: number) {
  const lowerCaseString = "qwertyuiopasdfghjklzxcvbnm";
  const numbers = "1234567890";
  const upperCaseString = lowerCaseString.toUpperCase();

  const concatedStrings = lowerCaseString.concat(numbers, upperCaseString);

  return Array(length)
    .fill(null)
    .reduce((pre, cur) => {
      cur =
        concatedStrings[
          Math.floor(Math.random() * concatedStrings.length)
        ].concat(pre);
      return cur;
    }, "");
}
