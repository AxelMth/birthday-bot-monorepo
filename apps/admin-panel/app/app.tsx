import { Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <HStack>
      <p>Count: {count}</p>
      <Button onClick={() => setCount((prev) => prev + 1)}>Click me</Button>
    </HStack>
  );
}
