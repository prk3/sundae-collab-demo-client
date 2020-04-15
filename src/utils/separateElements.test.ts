import separateElements from './separateElements';

describe('separateElements', () => {
  it('does not separate empty arrays', () => {
    const arr: number[] = [];
    const generate = () => 100;
    const mock = jest.fn(generate);
    const result = separateElements(arr, mock);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(0);
    expect(mock).toBeCalledTimes(0);
  });

  it('does not separate arrays with one element', () => {
    const arr = [0];
    const generate = () => 100;
    const mock = jest.fn(generate);
    const result = separateElements(arr, mock);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(0);
    expect(mock).toBeCalledTimes(0);
  });

  it('separates arrays with 2 elements', () => {
    const arr = [0, 2];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generate = (prev: number, next: number, index: number) => (prev + next) / 2;
    const mock = jest.fn(generate);
    const result = separateElements(arr, mock);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual(0);
    expect(result[1]).toEqual(1);
    expect(result[2]).toEqual(2);
    expect(mock).toBeCalledTimes(1);
    expect(mock).toHaveBeenNthCalledWith(1, 0, 2, 0);
  });

  it('separates arrays with 5 elements', () => {
    const arr = [0, 2, 4, 6, 8];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generate = (prev: number, next: number, index: number) => (prev + next) / 2;
    const mock = jest.fn(generate);
    const result = separateElements(arr, mock);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(9);
    for (let i = 0; i < 9; i += 1) {
      expect(result[i]).toEqual(i);
    }
    expect(mock).toHaveBeenCalledTimes(4);
    expect(mock).toHaveBeenNthCalledWith(1, 0, 2, 0);
    expect(mock).toHaveBeenNthCalledWith(2, 2, 4, 1);
    expect(mock).toHaveBeenNthCalledWith(3, 4, 6, 2);
    expect(mock).toHaveBeenNthCalledWith(4, 6, 8, 3);
  });
});
