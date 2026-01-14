import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { user, role, loading, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  if (loading) return null;

  // GSAP navbar entrance
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  // Show login success SweetAlert2
  useEffect(() => {
    if (user) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome, ${user.displayName || user.email}`,
        timer: 1800,
        showConfirmButton: false,
      });
    }
  }, [user]);

  const getMenuItems = () => {
    if (!user)
      return [
        { to: '/', label: 'Home' },
        { to: '/signin', label: 'Login' },
      ];

    if (role === 'admin')
      return [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/managebook', label: 'Manage Books' },
        { to: '/admin/manageusers', label: 'Manage Users' },
        { to: '/admin/moderatereviews', label: 'Reviews' },
      ];

    return [
      { to: '/', label: 'Home' },
      { to: '/browsebookspage', label: 'Browse Books' },
      { to: '/mylibrary', label: 'My Library' },
      { to: '/recomendations', label: 'Recommendations' },
    ];
  };

  const handleLogout = async () => {
    // Show SweetAlert2 confirm
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316', // orange
      cancelButtonColor: '#6b7280', // gray
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await signoutUser();
      toast.success('Logout Successful!', {
        position: 'top-right',
        autoClose: 2000,
      });
      navigate('/signin');
      setOpen(false);
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-md"
      >
        <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-orange-600 cursor-pointer"
          >
            BookWorm
          </motion.span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {getMenuItems().map((item, i) => (
              <NavLink key={i} to={item.to} className="relative">
                {({ isActive }) => (
                  <>
                    <motion.span
                      whileHover={{ y: -2 }}
                      className={`px-2 py-1 font-medium transition
                        ${
                          isActive
                            ? 'text-orange-600'
                            : 'text-gray-600 hover:text-orange-600'
                        }`}
                    >
                      {item.label}
                    </motion.span>

                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-600 rounded"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop User */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              {/* Profile Image */}
              <img
                src={user.photoURL || undefined}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-orange-400"
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://i.ibb.co/2N2r2B6/default-user.png')
                }
              />
              <span className="text-sm text-gray-600 max-w-[120px] truncate">
                {user.displayName || user.email}
              </span>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full text-sm font-medium
                bg-gradient-to-r from-red-100 to-red-200 text-red-600 cursor-pointer"
              >
                Logout
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-700 cursor-pointer"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="md:hidden bg-white/90 backdrop-blur-lg shadow-lg"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {getMenuItems().map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-medium transition ${
                        isActive
                          ? 'text-orange-600'
                          : 'text-gray-700 hover:text-orange-600'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                {user && (
                  <div className="flex flex-col items-start gap-2 mt-2">
                    <img
                      src={user.photoURL || undefined}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-400"
                      onError={(e) =>
                        (e.currentTarget.src =
                          'https://i.ibb.co/2N2r2B6/default-user.png')
                      }
                    />
                    <span className="text-sm text-gray-600 truncate max-w-[180px]">
                      {user.displayName || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="mt-2 px-4 py-2 rounded-full text-sm bg-red-100 text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* React Toast container */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
