import React from 'react';

import { Link } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {

  },
  welcome: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
}));

type Props = {
  name: string;
};

/**
 * Navigation bar with app name, user name and links.
 */
export default function Navbar({ name }: Props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar>
        <Toolbar>
          <div className={classes.content}>
            <div className={classes.logo}>sundae!</div>
            <div className={classes.nav}>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              <div className={classes.welcome}>Hello {name}!</div>
              <Link to="/recipes"><Button variant="contained">Recipes</Button></Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ opacity: 0 }} />
    </div>
  );
}
