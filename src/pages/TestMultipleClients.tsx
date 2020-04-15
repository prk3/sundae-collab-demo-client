import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Provider as CollaborationProvider,
  Resource, TextField, MultiCursorText,
} from 'sundae-collab-react';
import { makeStyles } from '@material-ui/core/styles';

import generateName from '../utils/generateName';
import { COLORS, FALLBACK_COLOR } from '../colors';

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: 10,
    justifyContent: 'stretch',
    width: '100vw',
    height: '100vh',
    padding: 10,
  },
  editor: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    flex: 1,
    margin: '5px 0 0 0',
    resize: 'none',
  },
}));

function Editor({ name }: { name: string }) {
  const classes = useStyles();
  return (
    <div data-cy="editor" className={classes.editor}>
      <div>{name}</div>
      <CollaborationProvider url={process.env.REACT_APP_COLLAB_URL} identity={{ name }}>
        <Resource type="multiple_clients_type" id="multiple_clients_id" value="this is some content">
          <TextField path="">
            {({
              value,
              cursors,
              userCursor,
              onChange,
              onSelectionChange,
            }) => (
              <MultiCursorText
                className={classes.textarea}
                value={value}
                cursors={cursors}
                colors={COLORS}
                fallbackColor={FALLBACK_COLOR}
                userCursor={userCursor}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
              />
            )}
          </TextField>
        </Resource>
      </CollaborationProvider>
    </div>
  );
}

/**
 * Creates multiple clients and editors in one browser tab.
 */
export default function TestMultipleClients() {
  const classes = useStyles();
  const params = useParams<any>();

  return (
    <div className={classes.container}>
      {[...new Array(Number(params.number))].map(() => {
        const name = generateName(true);
        return <Editor key={name} name={name} />;
      })}
    </div>
  );
}
