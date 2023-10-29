import CreateProject from '../components/modals/CreateProject';

const ProjectPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-base-100">
      <h1>Protected </h1>
      <p>Project Pages</p>
      <button className="w-24 btn btn-primary" onClick={() => document.getElementById('add_new_project').showModal()}>
        Add Project
      </button>
      <CreateProject />
    </div>
  );
};

export default ProjectPage;
