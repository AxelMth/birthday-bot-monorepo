import { useParams } from 'react-router';

export default function EditPersonComponent() {
  const params = useParams();
  const personId = params.id;
  return (
    <div>
      <h1>Edit Person {personId}</h1>
    </div>
  );
}
