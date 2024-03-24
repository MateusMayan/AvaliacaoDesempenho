import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  MouseEventHandler,
} from 'react';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  uId: string | null;
  user: any | null;
  loading: boolean | null;
  error: string | null;
  children: ReactNode | null;
  setUId: Function | null;
  fazerLogin: Function | null;
  fazerLogout: Function | null;
  cadastrarUsuario: Function | null;
}

export const useUser = () => useContext(UserContext);

export const UserContext = createContext<UserContextType>({
  uId: null,
  user: null,
  loading: false,
  error: null,
  children: null,
  setUId: null,
  fazerLogin: null,
  fazerLogout: null,
  cadastrarUsuario: null,
});

export const UserStorage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<object | null>(null);
  const [uId, setUId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Functions
  const fazerLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      const credentialUser = await userCredential.user;
      setUser(credentialUser);
      setUId(credentialUser.uid);
      navigate('/main');
    } catch (error: any) {
      console.error('Error during login:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarUsuario = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const userUID = userCredential.user.uid;
          const userRef = doc(db, 'employees', userUID);
          const userData = {
            nome: name,
            email: email,
            idCliente: userUID,
          };
          await setDoc(userRef, userData);
          const userDoc = await getDoc(userRef);
          console.log(userDoc);
          navigate('/account');
        },
      );
    } catch (error: Error | any) {
      const errorMessage = error.message;
      setError(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const fazerLogout = async () => {
    try {
      await signOut(auth);
      setUId(null);
      setUser(null);
    } catch (error) {
      window.alert('Logout Não Foi Concluído');
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUId(user.uid);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        uId,
        user,
        loading,
        error,
        children,
        setUId,
        fazerLogin,
        fazerLogout,
        cadastrarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
