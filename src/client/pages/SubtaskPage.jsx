import PageTitle from '../components/PageTitle';
import { useQuery } from '@tanstack/react-query';

const SubtaskPage = ({ useRouteContext }) => {
  const { queryOptions } = useRouteContext();
  const { data, isLoading, isError } = useQuery(queryOptions);
  console.log(data);
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center justify-between p-2">
      <PageTitle title={'Subtask Page'} />
      <div className="max-w-xs ">
        <p>text</p>
      </div>
    </div>
  );
};

export default SubtaskPage;
