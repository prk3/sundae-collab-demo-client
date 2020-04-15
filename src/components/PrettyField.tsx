import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    display: 'block',
  },
  error: {
    color: 'red',
  },
}));


type Props = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

/**
 * Wraps input component field with a label and adds an optional error message.
 */
export default function PrettyField({ label, error, children }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      {label}
      <br />
      {/* lint can't figure out what children will be */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label data-cy-label={label} className={classes.label}>
        {children}
      </label>
      {typeof error === 'string' && (
        <div className={classes.error}>{error}</div>
      )}
    </div>
  );
}
