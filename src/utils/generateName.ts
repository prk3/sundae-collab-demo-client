/**
 * A list of possible names.
 */
const NAMES = ['tom', 'mark', 'john', 'patrick', 'emily', 'alice', 'susan', 'kate'];

/**
 * Generates hopefully unique client name by drawing a name and adding a number
 * to the end of a string. Strong parameter decreases probability of collision.
 */
export default function generateName(strong = false): string {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const number = Math.floor(Math.random() * (strong ? 10000 : 100));
  return name + number;
}
