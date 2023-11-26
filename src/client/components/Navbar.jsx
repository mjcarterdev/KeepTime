import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
// import router from '../router';

const getMenuItems = (authenticated) => {
  let menuItems;

  if (authenticated) {
    menuItems = [
      { name: 'About Us', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Profile', path: '/profile' },
      { name: 'Logout', path: '/' },
    ];
  } else {
    menuItems = [
      { name: 'About Us', path: '/about' },
      { name: 'Login', path: '/' },
      { name: 'Sign Up', path: '/signup' },
    ];
  }
  return menuItems;
};

const NavBar = ({ location = '' }) => {
  const { user, setUser } = useContext(AuthContext);
  const { logoutOnSubmit, logoutData, logoutError, logoutIsLoading } =
    useLogout();
  let menuItems = getMenuItems(user);

  useEffect(() => {
    menuItems = getMenuItems(user);
  }, [user]);

  const style = 'whitespace-nowrap hover:text-accent cursor-pointer ';
  const selectedStyle = 'whitespace-nowrap text-accent';

  const handleLogout = async () => {
    logoutOnSubmit();
    setUser('');
  };

  return (
    <nav className="absolute top-0 z-50 w-full h-16 p-2 px-1 rounded-md py-0w-full border bg-neutral border-gray-100 rounded-md shadow-[2px_4px_5px_2px_#00000024] min-h-[4rem] py-0w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-black navbar max-h-16">
      <div className="navbar-start">
        <span className="px-4 text-3xl font-medium underline normal-case underline-offset-6 decoration-accent whitespace-nowrap">
          <h2>{location} </h2>
        </span>
      </div>
      <span className="whitespace-nowrap"></span>
      <div className="hidden navbar-end lg:flex">
        <ul className="px-4 space-x-4 font-medium menu-lg menu-horizontal">
          {menuItems.map((item) => {
            if (item.name === 'Logout') {
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? selectedStyle : style
                  }
                  onClick={() => handleLogout()}
                  disabled
                >
                  {item.name}
                </NavLink>
              );
            }
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => (isActive ? selectedStyle : style)}
              >
                {item.name}
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-accent"
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
            className="flex-col w-32 p-2 font-medium border bg-neutral border-gray-100 rounded-md shadow-[2px_4px_5px_2px_#00000024] text-2rem menu-sm dropdown-content bg-clip-padding backdrop-filter backdrop-blur-3xl "
          >
            {menuItems.map((item) => {
              if (item.name === 'Logout') {
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? selectedStyle : style
                      }
                      onClick={() => handleLogout()}
                      disabled
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              }
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? selectedStyle : style
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
