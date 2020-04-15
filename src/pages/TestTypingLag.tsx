import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  area: {
    '&:focus': {
      color: 'white',
      resize: 'none',
      border: '1px solid black',
      backgroundColor: 'white',
    },
  },
}));

/**
 * Component that adds lag between key presses and visual feedback.
 */
export default function TestTypingLag() {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [delay, setDelay] = useState(0);

  const handleDelay = (ev: any, value: number | number[]) => {
    setDelay(value as number);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    window.setTimeout(() => {
      setContent(newContent);
    }, delay);
  };

  return (
    <Container>
      <br />
      <Slider
        value={delay}
        onChange={handleDelay}
        step={10}
        min={0}
        max={200}
        style={{ width: 500 }}
      />
      {delay}
      <br />
      <textarea
        className={classes.area}
        defaultValue=""
        onChange={handleContentChange}
        rows={10}
        style={{ width: 500 }}
      />
      <br />
      <pre>{content}</pre>
    </Container>
  );
}
