import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="text-xl normal-case btn btn-ghost">
          <Link to={`/`}>KeepTime</Link>
        </a>
      </div>
      <div className="hidden navbar-end lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to={`login`}>Login</Link>
          </li>
          <li>
            <Link to={`signup`}>SignUp</Link>
          </li>
          <li>
            <Link to={`projects`}>Projects</Link>
          </li>
          <li>
            <Link to={`profile`}>Profile</Link>
          </li>
          <li>
            <Link to={`about`}>About Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`login`}>Login</Link>
            </li>
            <li>
              <Link to={`signup`}>SignUp</Link>
            </li>
            <li>
              <Link to={`projects`}>Projects</Link>
            </li>
            <li>
              <Link to={`profile`}>Profile</Link>
            </li>
            <li>
              <Link to={`about`}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
