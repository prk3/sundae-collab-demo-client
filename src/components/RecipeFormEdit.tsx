import React from 'react';
import {
  ReplaceField, NumberField, TextField, MultiCursorText, useValue,
} from 'sundae-collab-react';
import PrettyField from './PrettyField';
import Participants from './Participants';
import { COLORS, FALLBACK_COLOR } from '../colors';
import Recipe, { validators, Type } from '../models/recipe';
import TimeInput from './TimeInput';

type Props = {
  formRef: React.MutableRefObject<{ submit: () => void } | null>;
  onSubmit?: (value: Recipe) => void;
};

/**
 * Form for editing existing recipes.
 */
export default function RecipeForm({ formRef, onSubmit }: Props) {
  // Retrieve data from session context.
  const [data] = useValue();

  // Create a formik-like ref to trigger submit.
  const methods = {
    submit() {
      // This cast is unsafe. We should validate resources on collab-server.
      const recipe = data as any as Recipe;

      if (onSubmit
        && !validators.name(recipe.name)
        && !validators.description(recipe.description)
        && !validators.type(recipe.type)
        && !validators.time(recipe.time)
        && !validators.alcohol(recipe.alcohol)) {
        onSubmit(recipe);
      }
    },
  };

  // Set the ref is passed via props.
  if (formRef) {
    formRef.current = methods; /* eslint-disable-line no-param-reassign */
  }

  return (
    <form>
      {/* show session participants */}
      <Participants />

      <TextField path="/name">
        {(props) => (
          <PrettyField label="Name" error={validators.name(props.value)}>
            {/* using fancy cursor component! */}
            <MultiCursorText
              name="name"
              cursors={props.cursors}
              userCursor={props.userCursor}
              value={props.value}
              // passing color variables
              colors={COLORS}
              fallbackColor={FALLBACK_COLOR}
              onChange={props.onChange}
              onSelectionChange={props.onSelectionChange}
            />
          </PrettyField>
        )}
      </TextField>

      <TextField path="/description">
        {(props) => (
          <PrettyField label="Description" error={validators.description(props.value)}>
            <MultiCursorText
              name="description"
              cursors={props.cursors}
              userCursor={props.userCursor}
              value={props.value}
              colors={COLORS}
              fallbackColor={FALLBACK_COLOR}
              onChange={props.onChange}
              onSelectionChange={props.onSelectionChange}
            />
          </PrettyField>
        )}
      </TextField>

      <ReplaceField path="/type">
        {({ value, onChange }) => (
          <PrettyField label="Type" error={validators.type(value as Type)}>
            <select
              data-cy="recipe-type"
              name="type"
              value={value as Type}
              onChange={(ev) => onChange(ev.target.value)}
            >
              <option value={Type.Drink}>Drink</option>
              <option value={Type.Appetizer}>Appetizer</option>
              <option value={Type.Soup}>Soup</option>
              <option value={Type.Main}>Main course</option>
              <option value={Type.Dessert}>Dessert</option>
            </select>
          </PrettyField>
        )}
      </ReplaceField>

      <NumberField path="/time">
        {({ value, onChange }) => (
          <PrettyField label="Preparation time" error={validators.time(value)}>
            <TimeInput value={value} onChange={(v) => onChange('add', v - value)} />
          </PrettyField>
        )}
      </NumberField>

      <ReplaceField path="/alcohol">
        {({ value, onChange }) => (
          <PrettyField label="Contains alcohol" error={validators.alcohol(value as boolean)}>
            <input
              data-cy="recipe-alcohol"
              name="alcohol"
              type="checkbox"
              checked={value as boolean}
              onChange={(ev) => onChange(ev.target.checked)}
            />
          </PrettyField>
        )}
      </ReplaceField>
    </form>
  );
}
