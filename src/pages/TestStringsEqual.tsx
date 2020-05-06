import React, { useState } from 'react';

export default function TestMultipleClients() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  return (
    <div>
      <textarea value={first} onChange={(e) => setFirst(e.target.value)} />
      <textarea value={second} onChange={(e) => setSecond(e.target.value)} />
      <div>
        {'match: '}
        {first === second ? 'YES' : 'NO'}
      </div>
    </div>
  );
}
