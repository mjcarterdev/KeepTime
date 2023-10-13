import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AboutUsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['testing'],
    queryFn: () => axios.get('/api/about').then((res) => res.data),
  });
  console.log(data);
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100">
      <div>
        {isLoading ? <p>is Loading...</p> : <p>{JSON.stringify(data[0])}</p>}
        <p>About Us Page</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
