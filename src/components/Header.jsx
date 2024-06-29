import React, { useState } from 'react';
import { Logout, Logo, Container } from './index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth?.status || false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='py-3 shadow bg-black text-white relative'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className='lg:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white focus:outline-none z-50 relative'
              aria-label="Toggle menu"
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {menuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
          <ul className={`lg:flex lg:ml-auto items-center fixed lg:static inset-0 lg:inset-auto transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} lg:translate-y-0 transition-transform duration-300 ease-in-out bg-black lg:bg-transparent z-40`}>
            <div className='container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-end'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='lg:ml-4'>
                    <button
                      className='block lg:inline-block py-3 px-6 duration-200 hover:bg-[#df7e08] rounded-full'
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false); // Close the menu on item click
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='lg:ml-4'>
                  <Logout />
                </li>
              )}
            </div>
          </ul>
        </nav>
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={toggleMenu}
          />
        )}
      </Container>
    </header>
  );
}

export default Header;