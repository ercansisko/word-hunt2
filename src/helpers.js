export const getRandomUniqueNumbers = (count, min, max, forbiddenArr = []) => {
  if (count > max - min + 1) {
    throw new Error(
      "Count should be less than or equal to the range of numbers"
    );
  }

  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!forbiddenArr.includes(randomNumber)) uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
};
export const WORDS_LENGTH = 100;
export const sessions = ["ilk", "tekrar", "bulmaca"];
