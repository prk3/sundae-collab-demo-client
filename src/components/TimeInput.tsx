import React from 'react';

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

/**
 * Input component for recipe's time field. Shows minus and plus buttons.
 */
export default function TimeInput({ value, onChange }: Props) {
  return (
    <>
      <button type="button" disabled={value <= 5} onClick={() => onChange(value - 5)}>-</button>
      <span style={{ padding: '0 10px' }}>{value}</span>
      <button type="button" onClick={() => onChange(value + 5)}>+</button>
    </>
  );
}
