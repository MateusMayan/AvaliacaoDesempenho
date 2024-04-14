import React, { useState, createContext, ReactNode, useContext } from 'react';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
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

interface EmployeesProps {
  Nome: string;
  Email: string;
  Cargo: string;
  Id: string;
}

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
  employees: EmployeesProps[] | null;
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
  const [employees, setEmployees] = useState<EmployeesProps[]>([]);
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
      setUId(credentialUser.uid);
      const docRef = doc(db, 'employees', credentialUser.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      const userData = JSON.stringify(docSnap.data());
      localStorage.setItem('userData', userData);
      const employeesRef = collection(db, 'employees');
      const querySnapShot = await getDocs(employeesRef);
      const newEmployees: EmployeesProps[] = [];
      querySnapShot.forEach((doc) => {
        newEmployees.push(doc.data() as EmployeesProps);
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
            Id: userUID,
          };
          await setDoc(userRef, userData);
          const userDoc = await getDoc(userRef);
          console.log(userDoc);
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
      localStorage.clear();
    } catch (error) {
      window.alert('Logout Não Foi Concluído');
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
        user && setUId(user.Id);
        const employeesRef = collection(db, 'employees');
        const querySnapShot = await getDocs(employeesRef);
        const newEmployees: EmployeesProps[] = [];
        querySnapShot.forEach((doc) => {
          newEmployees.push(doc.data() as EmployeesProps);
        });
        setEmployees(newEmployees);
      }
    }
    fetchData();
  }, [user]);

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
