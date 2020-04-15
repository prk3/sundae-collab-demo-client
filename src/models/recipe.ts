
/**
 * Recipe type.
 */
export enum Type {
  Drink = 'drink',
  Appetizer = 'appetizer',
  Soup = 'soup',
  Main = 'main',
  Dessert = 'dessert',
}

/**
 * Full recipe model.
 */
export default interface Recipe {
  id: number;
  name: string;
  description: string;
  type: Type;
  time: number;
  alcohol: boolean;
}

/**
 * Recipe without id.
 */
export type RecipeInput = Omit<Recipe, 'id'> & Partial<Pick<Recipe, 'id'>>;


/**
 * Collection of field validators. Undefined = valid, string = error.
 */
export const validators = {
  name: (name: string): string | undefined => {
    if (name.length === 0) return 'Name is empty!';
    if (name.length > 500) return 'Name is too long!';
    return undefined;
  },
  description: (description: string): string | undefined => {
    if (description.length === 0) return 'Description is empty!';
    if (description.length > 2000) return 'Description is too long!';
    return undefined;
  },
  type: (type: Type): string | undefined => {
    if (!Object.values(Type).includes(type)) return 'Invalid type!';
    return undefined;
  },
  time: (time: number): string | undefined => {
    if (Number.isNaN(time)) return 'Not a number!';
    if (Math.round(time) !== time) return 'Not a whole number!';
    if (time < 5) return 'Time must be at lest 5 minutes!';
    if (time % 5) return 'Time must be a multiple of 5 minutes!';
    return undefined;
  },
  alcohol: (time: boolean): string | undefined => {
    if (time !== true && time !== false) return 'Invalid option!';
    return undefined;
  },
};
