import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from '../components/RecipeCard';

import Recipe from '../models/recipe';
import api, { ignoreAbort } from '../utils/api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  addLink: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  addCard: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

/**
 * Fetches all recipes and displays them in a grid.
 */
export default function Recipes() {
  const classes = useStyles();
  const history = useHistory();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // abort controllers in case the user unmounts the component before fetch resolves
  const [abortGet, setAbortGet] = useState<AbortController | null>(null);
  const [abortDel, setAbortDel] = useState<AbortController | null>(null);

  // fetch data at the start
  useEffect(() => {
    const abort = new AbortController();

    api.get('/recipes', abort)
      .then(setRecipes)
      .catch(ignoreAbort)
      .catch((err) => console.error('Recipe fetching failed', err));

    setAbortGet(() => abort);

    return () => abort.abort();
  }, []);

  // abort old delete requests
  useEffect(() => () => {
    abortDel?.abort();
  }, [abortDel]);

  function onEdit(id: number) {
    history.push(`/recipes/${id}`);
  }

  function onDelete(id: number) {
    const newAbortDel = new AbortController();
    setAbortDel(() => newAbortDel);

    api.del(`/recipes/${id}`, undefined, newAbortDel)
      .then(() => api.get('/recipes', newAbortDel))
      .then((response) => {
        // post-delete get can clear the initial get
        // not very likely to happen
        abortGet?.abort();
        return response;
      })
      .then(setRecipes)
      .catch(ignoreAbort)
      .catch((err) => console.error(`Deleting recipe <${id}> failed`, err));
  }

  return (
    <div>
      <Container className={classes.container}>
        <Grid container spacing={3} alignItems="stretch">
          {recipes.map((recipe) => (
            <Grid item md={3} sm={4} xs={6} key={recipe.id}>
              <RecipeCard recipe={recipe} onDelete={onDelete} onEdit={onEdit} />
            </Grid>
          ))}
          <Grid item md={3} sm={4} xs={6}>
            <Link className={classes.addLink} to="/recipes/add" data-cy="recipe-add">
              <Card className={classes.addCard}>
                <AddIcon fontSize="large" />
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
