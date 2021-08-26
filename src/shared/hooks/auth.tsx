import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../service/api';

interface User {
  id: string;
  name: string;
  mobile: number;
}

interface AuthState {
  mobile: number | null;
  token: string | null;
  user: User;
}

interface SignInCredentials {
  mobile: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  deliveryData(mobile: string, name: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function clearAll(): Promise<void> {
      await AsyncStorage.multiRemove([
        '@Massas:token',
        '@Massas:user',
        '@Massas:mobile,',
        '@Massas:password',
      ]);
    }

    clearAll();
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user, mobile] = await AsyncStorage.multiGet([
        '@Massas:token',
        '@Massas:user',
        '@Massas:mobile,',
        '@Massas:password',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          mobile: Number(mobile[1]),
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ mobile, password }) => {
    const response = await api.post('sessions', {
      mobile,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Massas:token', token],
      ['@Massas:user', JSON.stringify(user)],
      ['@Massas:mobile', mobile],
      ['@Massas:password', password],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user, mobile });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(['@Massas:token', '@Massas:user']);
    } catch (err) {
      console.log(err);
    }

    await AsyncStorage.removeItem('@Massas:token');

    setData({} as AuthState);
  }, []);

  const deliveryData = useCallback(async (mobile, name) => {
    await AsyncStorage.setItem('@Massas:user', JSON.stringify({ name, mobile }),
);

    setData({ user: { name, mobile }, token: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, deliveryData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };