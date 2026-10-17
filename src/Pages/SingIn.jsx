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
import { FaGoogle, FaBookOpen } from 'react-icons/fa';
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { RiLoginBoxLine } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Firebase/Firebase.confige';
import SignInScene from '../Componentes/SignInScene';

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Helmet>
        <title>Sign In | BookHub</title>
      </Helmet>
      <Toaster position="top-right" />

      {/* Three.js bg */}
      <div className="fixed inset-0 z-0">
        <SignInScene />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-black/45" />

      {/* Card */}
      <div className="relative z-20 w-full max-w-md mx-4 my-10">
        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-3xl bg-white/10 blur-sm" />

        <div className="relative bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="p-8 space-y-5">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/8 border border-white/12 mb-1">
                <FaBookOpen size={28} className="text-white/80" />
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-white/35 flex items-center justify-center gap-1">
                <HiSparkles className="text-white/50" size={13} />
                Continue your reading adventure
                <HiSparkles className="text-white/50" size={13} />
              </p>
            </div>

            {/* Google button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/15 transition-all duration-300 font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
            >
              <FaGoogle
                size={18}
                className="text-white/70 group-hover:text-white transition-colors"
              />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-xs text-white/40 font-medium uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                  <MdOutlineEmail size={13} className="text-white/50" /> Email
                </label>
                <div className="relative">
                  <MdOutlineEmail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 hover:border-white/35 focus:border-white/60 text-white placeholder-white/25 rounded-xl outline-none transition-all focus:bg-white/8"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                  <MdLockOutline size={13} className="text-white/50" /> Password
                </label>
                <div className="relative">
                  <MdLockOutline
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/15 hover:border-white/35 focus:border-white/60 text-white placeholder-white/25 rounded-xl outline-none transition-all focus:bg-white/8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={!email}
                  className={`text-xs font-medium transition-all cursor-pointer ${
                    email
                      ? 'text-white/60 hover:text-white hover:underline'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <RiLoginBoxLine size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-white/40">
              No account?{' '}
              <NavLink
                to="/signup"
                className="text-white font-semibold hover:text-white/70 transition-colors"
              >
                Join for free
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
