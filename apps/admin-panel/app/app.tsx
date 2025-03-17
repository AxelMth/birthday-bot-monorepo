import { useEffect, useState } from 'react';

export function App() {
  const [data, setData] = useState<string>('');
  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL as string)
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data, null, 4)));
  });
  return <div>{data}</div>;
}

export default App;
