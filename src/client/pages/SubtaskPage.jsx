import { useQuery } from '@tanstack/react-query';
import NavBar from '../components/Navbar';
import { useLoaderData } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getSubtaskById } from '../api/services';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const SubtaskPage = () => {
  const { user } = useContext(AuthContext);
  const loader = useLoaderData();
  const subtaskId = loader.subtaskId;
  const { data, isLoading } = useQuery({
    queryKey: [`subtask`, subtaskId],
    queryFn: ({ queryKey }) => getSubtaskById(queryKey[1]),
  });

  useEffect(() => {
    if (user == '') {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <NavBar location="Subtask" />
      <div
        className={`flex pb-32 pt-24 flex-col flex-1 h-[100vh] w-full gap-2 p-4 overflow-y-scroll md:items-center scrollbar-hide md:scrollbar-default `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div>Id: {data?.data.id}</div>
            <div>title: {data?.data.title}</div>
            <div>description: {data?.data.description}</div>
          </>
        )}
      </div>
    </>
  );
};

export default SubtaskPage;
