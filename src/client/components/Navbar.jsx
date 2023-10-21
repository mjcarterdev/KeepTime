import { Link } from '@tanstack/react-router';
import Logo from './Logo';
import router from '../router';

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
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' },
    ];
  }
  return menuItems;
};

const NavBar = ({ authContext }) => {
  const { isAuth } = authContext.session();
  let menuItems = getMenuItems(isAuth);

  const style = 'whitespace-nowrap hover:text-secondary cursor-pointer';
  const selectedStyle = 'whitespace-nowrap text-secondary';

  const handleLogout = async () => {
    const res = await authContext.logout();
    if (!res.data.isAuthenticated) {
      router.navigate('/');
    }
  };

  return (
    <div className="navbar bg-neutral text-neutral-content .min-h-16 .p-0">
      <div className="navbar-start">
        <span className="text-xl normal-case btn btn-ghost">
          <Link to={`/`} activeOptions={{ exact: true }}>
            <Logo />
          </Link>
        </span>
      </div>
      <div className="hidden navbar-end lg:flex">
        <ul className="px-4 space-x-4 menu-lg menu-horizontal">
          {menuItems.map((item) => {
            if (item.name === 'Logout') {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={style}
                  activeProps={{ className: selectedStyle }}
                  activeOptions={{ exact: true }}
                  onClick={() => handleLogout()}
                  disabled
                >
                  {item.name}
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.path}
                className={style}
                activeProps={{ className: selectedStyle }}
                activeOptions={{ exact: true }}
              >
                {item.name}
              </Link>
            );
          })}
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
            className=".flex-col menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-neutral text-neutral-content w-52"
          >
            {menuItems.map((item) => {
              if (item.name === 'Logout') {
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={style}
                      activeProps={{ className: selectedStyle }}
                      activeOptions={{ exact: true }}
                      onClick={() => handleLogout()}
                      disabled
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={style}
                    activeProps={{ className: selectedStyle }}
                    activeOptions={{ exact: true }}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
