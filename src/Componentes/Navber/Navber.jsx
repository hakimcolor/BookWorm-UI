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
      confirmButtonColor: '#111',
      cancelButtonColor: '#555',
      confirmButtonText: 'Yes, logout',
      background: '#1a1a1a',
      color: '#fff',
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
          scrolled
            ? 'bg-black/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/8'
            : 'bg-black/60 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-all">
              <FaBookOpen size={15} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight group-hover:text-white/80 transition-colors">
              Book<span className="text-white/50">Worm</span>
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item, i) => (
              <NavLink key={i} to={item.to}>
                {({ isActive }) => (
                  <motion.span
                    whileHover={{ y: -1 }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/55 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-1 left-3 right-3 h-px bg-white/60 rounded"
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
                  className="w-8 h-8 rounded-full object-cover border border-white/25"
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://i.ibb.co/2N2r2B6/default-user.png')
                  }
                />
                <span className="text-sm text-white/50 max-w-[110px] truncate">
                  {user.displayName || user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-white/8 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white transition-all cursor-pointer"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <NavLink to="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-white text-black hover:bg-white/90 transition-all shadow-lg shadow-white/10 cursor-pointer"
                >
                  Get Started
                </motion.button>
              </NavLink>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/70 hover:text-white transition-colors cursor-pointer p-1"
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
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/8"
            >
              <div className="flex flex-col gap-1 px-5 py-5">
                {items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/55 hover:bg-white/8 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                {user ? (
                  <div className="flex items-center gap-3 px-4 pt-4 border-t border-white/10 mt-2">
                    <img
                      src={
                        user.photoURL ||
                        'https://i.ibb.co/2N2r2B6/default-user.png'
                      }
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border border-white/25"
                      onError={(e) =>
                        (e.currentTarget.src =
                          'https://i.ibb.co/2N2r2B6/default-user.png')
                      }
                    />
                    <span className="text-sm text-white/50 truncate flex-1">
                      {user.displayName || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-white/60 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="mt-3 mx-4 py-2.5 rounded-lg bg-white text-black text-sm font-bold text-center hover:bg-white/90 transition-all cursor-pointer"
                  >
                    Get Started
                  </NavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Navbar;
