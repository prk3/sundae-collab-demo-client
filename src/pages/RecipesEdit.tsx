import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Resource } from 'sundae-collab-react';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import RecipeForm from '../components/RecipeFormEdit';
import api, { ignoreAbort } from '../utils/api';
import Recipe, { RecipeInput } from '../models/recipe';

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
 * Page for editing recipes. Uses id from the url to fetch a recipe from API.
 * Uses API value to start/join a recipe collaboration session.
 */
export default function RecipeEdit() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<any>();

  const [recipeInitial, setRecipeInitial] = useState<Recipe | null>(null);
  const [abortSave, setAbortSave] = useState<AbortController | null>(null);

  // reference to edit form
  const form = useRef<{ submit(): void } | null>(null);

  const id: number | null = Number(params.id) || null;

  useEffect(() => {
    const abort = new AbortController();

    api.get(`/recipes/${id}`, abort)
      .then(setRecipeInitial)
      .catch(ignoreAbort)
      .catch((err) => console.error('recipe could not be read', err));

    // abort get requests when id changes
    return () => abort.abort();
  }, [id]);

  // cancel old save requests
  useEffect(() => () => {
    abortSave?.abort();
  }, [abortSave]);

  function submit(recipe: RecipeInput) {
    const abort = new AbortController();

    api.put(`/recipes/${recipe.id}`, recipe, abort)
      .then(() => history.push('/recipes')) // can history change?
      .catch(ignoreAbort)
      .catch((err) => console.error('recipe creation failed', err));

    setAbortSave(() => abort);
  }

  return (
    <div>
      <Container className={classes.container}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>Edit recipe</Typography>
            {recipeInitial && (
              <>
                {/* wrap form with recipe editing session */}
                <Resource type="recipe" id={String(id)} value={recipeInitial}>
                  <RecipeForm onSubmit={submit} formRef={form} />
                </Resource>
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    data-cy="recipe-save"
                    onClick={() => form.current?.submit()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={history.goBack}
                    data-cy="recipe-back"
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
            {!recipeInitial && (
              <span>loading...</span>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
