import { useState } from 'react';

const LandingPage = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleLogin = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignUpForm(false);
  };
  const handleSignUp = () => {
    setShowLoginForm(false);
    setShowSignUpForm(!showSignUpForm);
  };
  const handleLanding = () => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
  };

  return (
    <>
      <div className="flex flex-col px-3 py-5 space-y-4">
        {showLoginForm && <p>login component will render</p>}
        {showSignUpForm && <p>signUp component will render</p>}
        {!showLoginForm && !showSignUpForm && <p>landing page will render</p>}
      </div>
      <button className="btn btn-primary" onClick={() => handleLogin()}>
        show Login form
      </button>
      <button className="btn btn-primary" onClick={() => handleSignUp()}>
        show Sign Up form
      </button>
      <button className="btn btn-primary" onClick={() => handleLanding()}>
        landing page
      </button>
    </>
  );
};

export default LandingPage;
