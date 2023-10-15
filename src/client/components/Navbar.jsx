import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const NavBar = () => {
  let location = useLocation();
  const style = 'whitespace-nowrap hover:text-secondary';
  const selectedStyle = 'whitespace-nowrap text-secondary';

  return (
    <div className="navbar bg-neutral text-neutral-content .min-h-16 .p-0">
      <div className="navbar-start">
        <span className="text-xl normal-case btn btn-ghost">
          <Link to={`/`}>
            <Logo />
          </Link>
        </span>
      </div>
      <div className="hidden navbar-end lg:flex">
        <ul className="px-1 menu-lg menu-horizontal">
          <li className={location.pathname === '/login' ? selectedStyle : style}>
            <Link to={`login`}>Login</Link>
          </li>
          <li className={location.pathname === '/signup' ? selectedStyle : style}>
            <Link to={`signup`}>Sign Up</Link>
          </li>
          <li className={location.pathname === '/auth/projects' ? selectedStyle : style}>
            <Link to={`/auth/projects`}>Projects</Link>
          </li>
          <li className={location.pathname === '/auth/profile' ? selectedStyle : style}>
            <Link to={`/auth/profile`}>Profile</Link>
          </li>
          <li className={location.pathname === '/about' ? selectedStyle : style}>
            <Link to={`about`}>About Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-neutral text-neutral-content w-52"
          >
            <li className={location.pathname === '/login' ? selectedStyle : style}>
              <Link to={`login`}>Login</Link>
            </li>
            <li className={location.pathname === '/signup' ? selectedStyle : style}>
              <Link to={`signup`}>Sign Up</Link>
            </li>
            <li className={location.pathname === '/auth/projects' ? selectedStyle : style}>
              <Link to={`/auth/projects`}>Projects</Link>
            </li>
            <li className={location.pathname === '/auth/profile' ? selectedStyle : style}>
              <Link to={`/auth/profile`}>Profile</Link>
            </li>
            <li className={location.pathname === '/about' ? selectedStyle : style}>
              <Link to={`about`}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
