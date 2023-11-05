import NavBar from '../components/Navbar';

const AboutUsPage = ({ useLoader }) => {
  const { authContext } = useLoader();
  return (
    <>
      <NavBar authContext={authContext} />
      <div className="bg-transparent">
        <div>
          <p>About Us Page</p>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
