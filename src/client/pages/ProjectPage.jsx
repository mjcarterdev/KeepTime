import Timer from '../components/Timer';

const ProjectPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100 flex flex-col items-center justify-between p-2">
      <h1>Protected </h1>
      <p>Project Pages</p>
      <div className="max-w-xs bg-red-300 border-box">
        <Timer />
      </div>
    </div>
  );
};

export default ProjectPage;
