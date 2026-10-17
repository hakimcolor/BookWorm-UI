import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { user, role, loading, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (loading) return null;

  const getMenuItems = () => {
    if (!user)
      return [
        { to: '/', label: 'Home' },
        { to: '/signin', label: 'Sign In' },
      ];
    if (role === 'admin')
      return [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/managebook', label: 'Books' },
        { to: '/admin/manageusers', label: 'Users' },
        { to: '/admin/moderatereviews', label: 'Reviews' },
      ];
    return [
      { to: '/', label: 'Home' },
      { to: '/browsebookspage', label: 'Browse' },
      { to: '/mylibrary', label: 'My Library' },
      { to: '/recomendations', label: 'For You' },
    ];
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6B2737',
      cancelButtonColor: '#777',
      confirmButtonText: 'Yes, sign out',
      background: '#F8F5EF',
      color: '#242424',
    });
    if (result.isConfirmed) {
      await signoutUser();
      toast.success('Signed out successfully');
      navigate('/signin');
      setOpen(false);
    }
  };

  const items = getMenuItems();

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b' : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(248,245,239,0.98)'
            : 'rgba(248,245,239,0.9)',
          backdropFilter: 'blur(20px)',
          borderColor: scrolled ? '#C9A22744' : 'transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(107,39,55,0.08)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all"
              style={{
                background: 'rgba(107,39,55,0.1)',
                border: '1px solid rgba(107,39,55,0.2)',
              }}
            >
              <FaBookOpen size={15} style={{ color: '#6B2737' }} />
            </div>
            <span
              className="text-xl font-black tracking-tight group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#242424',
              }}
            >
              Book<span style={{ color: '#6B2737' }}>Worm</span>
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item, i) => (
              <NavLink key={i} to={item.to}>
                {({ isActive }) => (
                  <motion.span
                    whileHover={{ y: -1 }}
                    className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      color: isActive ? '#6B2737' : '#555',
                      background: isActive
                        ? 'rgba(107,39,55,0.08)'
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#6B2737';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#555';
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-1 left-3 right-3 h-px rounded"
                        style={{ background: '#C9A227' }}
                      />
                    )}
                  </motion.span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <img
                  src={
                    user.photoURL || 'https://i.ibb.co/2N2r2B6/default-user.png'
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  style={{ border: '2px solid #C9A227' }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://i.ibb.co/2N2r2B6/default-user.png')
                  }
                />
                <span
                  className="text-sm max-w-27.5 truncate"
                  style={{ color: '#777' }}
                >
                  {user.displayName || user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                  style={{
                    background: 'rgba(107,39,55,0.08)',
                    border: '1px solid rgba(107,39,55,0.2)',
                    color: '#6B2737',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#6B2737';
                    e.currentTarget.style.color = '#F8F5EF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(107,39,55,0.08)';
                    e.currentTarget.style.color = '#6B2737';
                  }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <NavLink to="/signup">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-lg"
                  style={{
                    background: '#6B2737',
                    color: '#F8F5EF',
                    boxShadow: '0 4px 14px rgba(107,39,55,0.25)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#4d1c28')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = '#6B2737')
                  }
                >
                  Get Started
                </motion.button>
              </NavLink>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden transition-colors cursor-pointer p-1"
            style={{ color: '#6B2737' }}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t"
              style={{
                background: 'rgba(248,245,239,0.98)',
                backdropFilter: 'blur(16px)',
                borderColor: '#E8E0D4',
              }}
            >
              <div className="flex flex-col gap-1 px-5 py-5">
                {items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    style={({ isActive }) => ({
                      color: isActive ? '#6B2737' : '#555',
                      background: isActive
                        ? 'rgba(107,39,55,0.08)'
                        : 'transparent',
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}

                {user ? (
                  <div
                    className="flex items-center gap-3 px-4 pt-4 mt-2 border-t"
                    style={{ borderColor: '#E8E0D4' }}
                  >
                    <img
                      src={
                        user.photoURL ||
                        'https://i.ibb.co/2N2r2B6/default-user.png'
                      }
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover"
                      style={{ border: '2px solid #C9A227' }}
                      onError={(e) =>
                        (e.currentTarget.src =
                          'https://i.ibb.co/2N2r2B6/default-user.png')
                      }
                    />
                    <span
                      className="text-sm truncate flex-1"
                      style={{ color: '#777' }}
                    >
                      {user.displayName || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      style={{
                        color: '#6B2737',
                        border: '1px solid rgba(107,39,55,0.25)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#6B2737';
                        e.currentTarget.style.color = '#F8F5EF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#6B2737';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="mt-3 mx-4 py-2.5 rounded-lg text-sm font-bold text-center transition-all cursor-pointer block"
                    style={{ background: '#6B2737', color: '#F8F5EF' }}
                  >
                    Get Started
                  </NavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <ToastContainer />
    </>
  );
};

export default Navbar;
