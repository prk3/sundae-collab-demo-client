import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import RecipeForm from '../components/RecipeFormAdd';
import api, { ignoreAbort } from '../utils/api';
import { RecipeInput, Type } from '../models/recipe';

/**
 * Default new recipe.
 */
const DEFAULT_RECIPE = Object.freeze<RecipeInput>({
  name: 'name',
  description: 'description',
  type: Type.Main,
  time: 60,
  alcohol: false,
});

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

/**
 * Page for adding new recipes. Uses RecipeFromAdd component.
 */
export default function RecipeAdd() {
  const classes = useStyles();
  const history = useHistory();

  const [abortAdd, setAbortAdd] = useState<AbortController | null>(null);

  const form = useRef<any>(null);

  // cancel old add request
  useEffect(() => () => {
    abortAdd?.abort();
  }, [abortAdd]);

  function submit(recipe: RecipeInput) {
    const abort = new AbortController();
    setAbortAdd(() => abort);

    api.post('/recipes', recipe, abort)
      .then(() => history.push('/recipes')) // can history change?
      .catch(ignoreAbort)
      .catch((err) => console.error('recipe creation failed', err));
  }

  return (
    <div>
      <Container className={classes.container}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>Add recipe</Typography>
            <RecipeForm
              initialValues={DEFAULT_RECIPE}
              onSubmit={submit}
              formikRef={(f: any) => { form.current = f; }}
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => form.current.submitForm()}
                data-cy="recipe-add"
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={history.goBack}
                data-cy="recipe-cancel"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
