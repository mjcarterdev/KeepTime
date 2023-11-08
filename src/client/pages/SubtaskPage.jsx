import { useQuery } from '@tanstack/react-query';
import NavBar from '../components/Navbar';

const SubtaskPage = ({ useRouteContext }) => {
  const { queryOptions, authContext } = useRouteContext();
  const { data, isLoading, isError } = useQuery(queryOptions);
  console.log(authContext);
  return (
    <>
      <NavBar authContext={authContext} />
      <div className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center justify-between p-2">
        <div className="max-w-xs ">
          <p>text</p>
        </div>
      </div>
    </>
  );
};

export default SubtaskPage;
