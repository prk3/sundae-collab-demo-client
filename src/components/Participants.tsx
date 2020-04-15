import React from 'react';
import { useParticipants, useClientId } from 'sundae-collab-react';
import separateElements from '../utils/separateElements';
import { COLORS, FALLBACK_COLOR } from '../colors';

/**
 * Displays session participants expects for the current user.
 * Client colors are indicated with a circle character.
 */
export default function Participants() {
  const participants = useParticipants();
  const clientId = useClientId();

  const names = participants
    .filter((p) => p.id !== clientId)
    .map((p) => (
      <span key={p.id}>
        <span style={{ color: COLORS[p.color] ?? FALLBACK_COLOR }}>●</span>
        {p.identity.name}
      </span>
    ));

  const getSeparator = (prev: JSX.Element) => <span key={`sep-${prev.key}`}>, </span>;

  return <div>{separateElements(names, getSeparator)}</div>;
}
