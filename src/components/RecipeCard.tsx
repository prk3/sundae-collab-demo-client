import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Recipe from '../models/recipe';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // :global does not work :/
    '& > div:first-child': {
      flexGrow: 1,
    },
  },
  desc: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

type Props = {
  recipe: Recipe;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

/**
 * Recipe preview displayed on the recipes page.
 * Edit and delete buttons are shown when edit/delete handlers are provided.
 */
export default function RecipeCard({ recipe, onEdit, onDelete }: Props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      data-cy="recipe"
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>{recipe.description}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {onEdit && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(recipe.id)}
            data-cy="recipe-edit"
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onDelete(recipe.id)}
            data-cy="recipe-delete"
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
