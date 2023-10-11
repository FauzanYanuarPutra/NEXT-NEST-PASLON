"use client"
import './../globals.css'
import { createContext, useReducer, useEffect, Dispatch } from "react";

import api from "../config/paslonApi";
import { getToken } from "../config/getToken";
import { useRouter } from "next/navigation";
import Loader from "../components/common/loadings/loader";


export const UserContext = createContext<{ state: any; dispatch: Dispatch<any> } | null>(null);

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        getToken();
        const res = await api.get("/paslons");
        if(res.data.user){
          dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
        } else {
          router.push('/auth/login')
          dispatch({ type: 'LOGOUT' });
        }
      } catch (err) {
        router.push('/auth/login')
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkUser();
  }, [ router ]);



  

  return (
    <>
      {!state.isLogin ? (
        <Loader />
      ): (
        <UserContext.Provider value={{ state, dispatch }}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};
