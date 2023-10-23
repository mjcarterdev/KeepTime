import PageTitle from '../components/PageTitle';
import Timer from '../components/Timer';

const ProjectPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center justify-between p-2">
      <PageTitle title={'Project Page'} />
      <div className="max-w-xs ">
        <Timer />
      </div>
    </div>
  );
};

export default ProjectPage;
