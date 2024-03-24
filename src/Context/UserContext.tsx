import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../Firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  uId: string | null;
  login: any;
  loading: boolean | null;
  error: string | null;
  children: ReactNode | null;
  setLogin: Function | null;
  setUId: Function | null;
  fazerLogin: Function | null;
  cadastrarUsuario: Function | null;
}

export const useUser = () => useContext(UserContext);

export const UserContext = createContext<UserContextType>({
  uId: null,
  login: null,
  loading: false,
  error: null,
  children: null,
  setLogin: null,
  setUId: null,
  fazerLogin: null,
  cadastrarUsuario: null,
});

export const UserStorage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uId, setUId] = useState<string | null>(null);
  const [login, setLogin] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Functions
  const fazerLogin = async (username: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      const user = userCredential.user;
      setUId(user.uid);
      navigate(`/account`);
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
      const auth = await getAuth();
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
          userDoc && setLogin(userDoc.data());
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

  // React Function
  useEffect(() => {
    const getUserInfo = async () => {
      const clientRef = collection(db, 'cliente');
      const queryVar = query(clientRef, where('idCliente', '==', uId));
      const querySnapshot = await getDocs(queryVar);
      querySnapshot.forEach(async (doc) => {
        setLogin(doc.data());
      });
    };
    getUserInfo();
  }, [uId]);

  return (
    <UserContext.Provider
      value={{
        uId,
        login,
        loading,
        error,
        children,
        setLogin,
        setUId,
        fazerLogin,
        cadastrarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
