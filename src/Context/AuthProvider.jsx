import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ✅ Create user (email/password)
  const createUser = async (email, password, displayName, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName,
      photoURL,
    });

    return userCredential;
  };

  // ✅ Email login
  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google login
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      email: user.email,
      name: user.displayName,
      profileImg: user.photoURL,
      role: 'user',
      provider: 'google',
      uid: user.uid,
      createdAt: new Date(),
    };

    // Save user if not exists (optional - backend may not be running)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, userData);
    } catch (err) {
      console.warn('Backend not available, continuing with Firebase auth only', err.message);
    }

    return result;
  };

  // ✅ Logout
  const signoutUser = () => {
    return signOut(auth);
  };

  // ✅ Auth state listener + role fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/role/${currentUser.email}`
          );
          setRole(res.data.role || 'user');
        } catch (error) {
          console.error('Role fetch failed:', error);
          setRole('user');
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signinUser,
    signInWithGoogle,
    signoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
