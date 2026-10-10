import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import {
  MdPersonOutline,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineImage,
} from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { updateProfile } from 'firebase/auth';
import { db } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import SignUpScene from '../Componentes/SignUpScene';
import BookImg from '../assets/book-image.png';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !name || !address || !password || !confirmPassword) {
      setLoading(false);
      return toast.error('Please fill all fields.');
    }
    if (!profileFile) {
      setLoading(false);
      return toast.error('Please upload a profile image.');
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error('Passwords do not match.');
    }
    if (password.length < 6) {
      setLoading(false);
      return toast.error('Password must be at least 6 characters.');
    }
    if (!/[A-Z]/.test(password)) {
      setLoading(false);
      return toast.error('Password must contain an uppercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      setLoading(false);
      return toast.error('Password must include a number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setLoading(false);
      return toast.error('Password must include a special character.');
    }
    try {
      const formData = new FormData();
      formData.append('image', profileFile);
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );
      const profileImg = uploadRes.data.data.display_url;
      const userCredential = await createUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImg,
      });
      const userData = {
        email,
        name,
        address,
        password,
        profileImg,
        role: 'user',
        provider: 'email',
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString(),
      };
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, userData);
      } catch (err) {
        console.warn(
          'Backend not available, continuing with Firebase only',
          err.message
        );
      }
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        profileImg,
        address,
        role: 'user',
        status: 'active',
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });
      toast.success('Account created successfully!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      console.error('Sign-up error:', error);
      let errorMessage = 'Account creation failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection.';
          break;
        default:
          errorMessage = error.message || 'Account creation failed.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Google sign-up successful!');
      navigate('/');
    } catch (error) {
      console.error('Google sign-up error:', error);
      let errorMessage = 'Google sign-up failed. Please try again.';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-up cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked. Please allow popups.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-up cancelled.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Account exists with a different sign-in method.';
          break;
        default:
          errorMessage = error.message || 'Google sign-up failed.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/25 text-white placeholder-white/40 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all text-sm';
  const labelCls =
    'block text-xs font-semibold text-teal-200 mb-1 uppercase tracking-wide';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Helmet>
        <title>Sign Up | BookHub</title>
      </Helmet>
      <Toaster position="top-right" />

      {/* Three.js full-page bg */}
      <div className="fixed inset-0 z-0">
        <SignUpScene />
      </div>

      {/* Teal-to-emerald dark overlay — different from SignIn */}
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-teal-950/75 via-emerald-950/70 to-slate-900/80 backdrop-blur-[2px]" />

      {/* Two-column card */}
      <div className="relative z-20 w-full max-w-5xl mx-4 my-8 flex rounded-3xl overflow-hidden shadow-2xl border border-white/15">
        {/* LEFT column — book image + branding */}
        <div className="hidden lg:flex lg:w-5/12 flex-col items-center justify-between bg-teal-950/60 backdrop-blur-lg p-10 border-r border-white/10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              Join
              <br />
              BookHub
            </h1>
            <p className="text-teal-300 text-sm mt-2">
              A universe of knowledge awaits
            </p>
          </div>

          <div className="w-full flex-1 flex items-center justify-center py-6">
            <img
              src={BookImg}
              alt="Books"
              className="w-full max-w-xs rounded-2xl object-cover shadow-xl shadow-teal-900/50 border border-white/10"
            />
          </div>

          <div className="text-center space-y-1">
            <p className="text-teal-400 text-xs">Already have an account?</p>
            <NavLink
              to="/signin"
              className="inline-block text-sm font-bold text-white border border-teal-500 px-5 py-2 rounded-full hover:bg-teal-500/30 transition-all"
            >
              Sign In
            </NavLink>
          </div>
        </div>

        {/* RIGHT column — form */}
        <div className="w-full lg:w-7/12 bg-white/8 backdrop-blur-xl p-8 sm:p-10 overflow-y-auto max-h-screen">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-extrabold text-white">
              Create Your Account
            </h2>
            <p className="text-teal-300 text-sm mt-1">
              Fill in the details below to get started
            </p>
          </div>

          {/* Google button — react-icons FaGoogle */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 mb-5 bg-white/90 rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow font-semibold text-gray-700 text-sm"
          >
            <FaGoogle size={18} className="text-red-500" />
            <span>{loading ? 'Signing up...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 text-white/50">OR SIGN UP WITH EMAIL</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 — Name + Profile Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name</label>
                <div className="relative">
                  <MdPersonOutline
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Profile Image</label>
                <div className="relative">
                  <MdOutlineImage
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 z-10"
                  />
                  <input
                    type="file"
                    onChange={(e) => setProfileFile(e.target.files[0])}
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/25 text-white/70 rounded-lg text-sm file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:bg-teal-500 file:text-white file:text-xs file:cursor-pointer outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2 — Email + Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Email</label>
                <div className="relative">
                  <MdOutlineEmail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Address</label>
                <div className="relative">
                  <MdOutlineLocationOn
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    type="text"
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Row 3 — Password + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Password</label>
                <div className="relative">
                  <RiLockPasswordLine
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars, A, 1, @"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls + ' pr-10'}
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelCls}>Confirm Password</label>
                <div className="relative">
                  <RiLockPasswordLine
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-emerald-400 focus:ring-4 focus:ring-teal-400/40 transition-all duration-300 shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Mobile sign-in link */}
          <p className="text-sm text-center text-white/50 mt-5 lg:hidden">
            Already have an account?{' '}
            <NavLink
              to="/signin"
              className="text-teal-300 font-semibold hover:text-teal-200 transition-colors"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
