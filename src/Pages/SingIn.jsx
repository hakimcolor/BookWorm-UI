// import { useContext, useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { FcGoogle } from 'react-icons/fc';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import toast, { Toaster } from 'react-hot-toast';
// import { Helmet } from 'react-helmet';
// import { AuthContext } from '../Context/AuthContext';
// import { auth } from '../Firebase/Firebase.confige';

// const SignIn = () => {
//   const { signinUser, signInWithGoogle } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ================= EMAIL / PASSWORD LOGIN =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return toast.error('Please fill all fields');
//     }

//     try {
//       setLoading(true);
//       toast.loading('Signing in...');
      
//       await signinUser(email, password);
      
//       toast.dismiss();
//       toast.success('Login successful!');
      
//       setTimeout(() => {
//         navigate('/');
//       }, 1000);
//     } catch (error) {
//       toast.dismiss();
//       console.error('Sign-in error:', error);

//       let errorMessage = 'Login failed. Please try again.';

//       switch (error.code) {
//         case 'auth/invalid-credential':
//           errorMessage = 'Invalid email or password';
//           break;
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email format';
//           break;
//         case 'auth/user-disabled':
//           errorMessage = 'This account has been disabled';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Try again later';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed';
//       }

//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= GOOGLE LOGIN =================
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       toast.loading('Signing in with Google...');
      
//       await signInWithGoogle();
      
//       toast.dismiss();
//       toast.success('Google login successful!');
      
//       setTimeout(() => {
//         navigate('/');
//       }, 1000);
//     } catch (error) {
//       toast.dismiss();
//       console.error('Google sign-in error:', error);

//       let errorMessage = 'Google sign-in failed';

//       switch (error.code) {
//         case 'auth/popup-closed-by-user':
//           errorMessage = 'Sign-in cancelled';
//           break;
//         case 'auth/popup-blocked':
//           errorMessage = 'Please allow popups for this site';
//           break;
//         case 'auth/network-request-failed':
//           errorMessage = 'Network error. Check your connection';
//           break;
//         default:
//           errorMessage = error.message || 'Google sign-in failed';
//       }

//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= FORGOT PASSWORD =================
//   const handleForgotPassword = () => {
//     if (!email) {
//       return toast.error('Please enter your email first!');
//     }

//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         toast.success('Password reset email sent! Check your inbox.');
//       })
//       .catch((error) => {
//         console.error('Password reset error:', error);

//         let errorMessage = 'Failed to send password reset email';

//         switch (error.code) {
//           case 'auth/user-not-found':
//             errorMessage = 'No account found with this email';
//             break;
//           case 'auth/invalid-email':
//             errorMessage = 'Invalid email format';
//             break;
//           case 'auth/too-many-requests':
//             errorMessage = 'Too many requests. Try again later';
//             break;
//           default:
//             errorMessage = error.message || 'Failed to send reset email';
//         }

//         toast.error(errorMessage);
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
//       <Helmet>
//         <title>Sign In | BookHub</title>
//       </Helmet>
//       <Toaster position="top-right" />

//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
//           {/* Header */}
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//             <p className="text-sm text-gray-600">Sign in to continue to BookHub</p>
//           </div>

//           {/* Google Sign In */}
//           <button
//             onClick={handleGoogleSignIn}
//             disabled={loading}
//             className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <FcGoogle size={24} />
//             <span>Continue with Google</span>
//           </button>

//           {/* Divider */}
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500 font-medium">Or sign in with email</span>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//                 </button>
//               </div>
//             </div>

//             <div className="text-right">
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 disabled={!email}
//                 className={`text-sm ${
//                   email
//                     ? 'text-amber-600 hover:text-amber-700 hover:underline'
//                     : 'text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <NavLink to="/signup" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
//               Sign Up
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Firebase/Firebase.confige';
import BookImage from '../assets/book-image.png'; // Add your book-related image here

const SignIn = () => {
  const { signinUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= EMAIL / PASSWORD LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please fill all fields');
    }

    try {
      setLoading(true);
      toast.loading('Signing in...');
      await signinUser(email, password);
      toast.dismiss();
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.dismiss();
      console.error('Sign-in error:', error);

      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Try again later';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      toast.loading('Signing in with Google...');
      await signInWithGoogle();
      toast.dismiss();
      toast.success('Google login successful!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.dismiss();
      console.error('Google sign-in error:', error);

      let errorMessage = 'Google sign-in failed';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Please allow popups for this site';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection';
          break;
        default:
          errorMessage = error.message || 'Google sign-in failed';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = () => {
    if (!email) {
      return toast.error('Please enter your email first!');
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        console.error('Password reset error:', error);

        let errorMessage = 'Failed to send password reset email';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many requests. Try again later';
            break;
          default:
            errorMessage = error.message || 'Failed to send reset email';
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign In | BookHub</title>
      </Helmet>
      <Toaster position="top-right" />

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src={BookImage}
            alt="Books"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600">
              Sign in to continue to BookHub
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={!email}
                className={`text-sm ${
                  email
                    ? 'text-amber-600 hover:text-amber-700 hover:underline'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <NavLink
              to="/signup"
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
