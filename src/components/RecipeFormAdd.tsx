import React from 'react';
import {
  Formik, Form, FormikHelpers, Field, FieldProps,
} from 'formik';
import { RecipeInput, Type, validators } from '../models/recipe';
import PrettyField from './PrettyField';
import TimeInput from './TimeInput';

type Props = {
  initialValues: RecipeInput;
  onSubmit: (value: RecipeInput, helpers: FormikHelpers<RecipeInput>) => void;
  formikRef?: (instance: any) => void;
};


/**
 * Form for adding new recipes.
 */
export default function RecipeForm({ initialValues, onSubmit, formikRef }: Props) {
  return (
    <Formik<RecipeInput>
      initialValues={initialValues}
      onSubmit={onSubmit}
      // Inner ref is necessary for triggering submit externally.
      innerRef={formikRef}
    >
      {() => (
        <Form>
          <Field name="name" validate={validators.name}>
            {({ field, meta: { error } }: FieldProps<string, RecipeInput>) => (
              <PrettyField label="Name" error={error}>
                <input
                  data-cy="recipe-name"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </PrettyField>
            )}
          </Field>

          <Field name="description" validate={validators.description}>
            {({ field, meta: { error } }: FieldProps<string, RecipeInput>) => (
              <PrettyField label="Description" error={error}>
                <textarea
                  data-cy="recipe-description"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </PrettyField>
            )}
          </Field>

          <Field name="type" validate={validators.type}>
            {({ field, meta: { error } }: FieldProps<Type, RecipeInput>) => (
              <PrettyField label="Type" error={error}>
                <select
                  data-cy="recipe-type"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  <option value={Type.Drink}>Drink</option>
                  <option value={Type.Appetizer}>Appetizer</option>
                  <option value={Type.Soup}>Soup</option>
                  <option value={Type.Main}>Main course</option>
                  <option value={Type.Dessert}>Dessert</option>
                </select>
              </PrettyField>
            )}
          </Field>

          <Field name="time" validate={validators.time}>
            {({ field, form, meta: { error } }: FieldProps<number, RecipeInput>) => (
              <PrettyField label="Preparation time" error={error}>
                <TimeInput value={field.value} onChange={(v) => form.setFieldValue('time', v)} />
              </PrettyField>
            )}
          </Field>

          <Field name="alcohol" validate={validators.alcohol}>
            {({ field, meta: { error } }: FieldProps<boolean, RecipeInput>) => (
              <PrettyField label="Contains alcohol" error={error}>
                <input
                  data-cy="recipe-alcohol"
                  type="checkbox"
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </PrettyField>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
