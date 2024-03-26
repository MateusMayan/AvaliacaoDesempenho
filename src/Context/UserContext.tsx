import React, { useState, createContext, ReactNode, useContext } from 'react';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../Firebase';
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  uId: string | null;
  user: any | undefined;
  loading: boolean | null;
  error: string | null;
  children: ReactNode | null;
  setUId: Function | null;
  fazerLogin: Function | null;
  fazerLogout: Function | null;
  cadastrarUsuario: Function | null;
  employees: Array<string> | null;
}

export const useUser = () => useContext(UserContext);

export const UserContext = createContext<UserContextType>({
  uId: null,
  user: undefined,
  loading: false,
  error: null,
  children: null,
  setUId: null,
  fazerLogin: null,
  fazerLogout: null,
  cadastrarUsuario: null,
  employees: null,
});

export const UserStorage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DocumentData | undefined>();
  const [uId, setUId] = useState<string | null>(null);
  const [employees, setEmployees] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const employeesRef = collection(db, 'employees');
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
      setUId(credentialUser.uid);
      const docRef = doc(db, 'employees', credentialUser.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      const querySnapShot = await getDocs(employeesRef);
      const newEmployees: string[] = [];
      querySnapShot.forEach((doc) => {
        newEmployees.push(doc.data().Nome);
      });
      setEmployees(newEmployees);
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
    cargo: string,
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
            Nome: name,
            Email: email,
            Cargo: cargo,
          };
          await setDoc(userRef, userData);
          const userDoc = await getDoc(userRef);
          console.log(userDoc);
          navigate('/main');
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
      setUser(undefined);
    } catch (error) {
      window.alert('Logout Não Foi Concluído');
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'employees', user.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data());
        setUId(user.uid);
        const querySnapShot = await getDocs(employeesRef);
        const newEmployees: string[] = [];
        querySnapShot.forEach((doc) => {
          newEmployees.push(doc.data().Nome);
        });
        setEmployees(newEmployees);
      }
    });
  }, [employeesRef]);

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
        employees,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
