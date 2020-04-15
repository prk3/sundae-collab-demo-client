
/**
 * Works like array.join(x) but outputs an array and generates separators using
 * a function.
 */
export default function separateElements<T>(
  elements: T[],
  getSeparator: (prev: T, next: T, nth: number) => T,
): T[] {
  if (elements.length === 0) return [];
  if (elements.length === 1) return [elements[0]];

  const newArray = new Array<T>((elements.length * 2) - 1);

  let outIndex = 0;
  for (let i = 0; i < elements.length - 1; i += 1) {
    newArray[outIndex] = elements[i];
    newArray[outIndex + 1] = getSeparator(elements[i], elements[i + 1], i);
    outIndex += 2;
  }

  newArray[outIndex] = elements[elements.length - 1];

  return newArray;
}
