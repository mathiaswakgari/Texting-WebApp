import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../services/firebase";
import { ChatInfo } from "../components/ChatList";
import { AuthContext } from "./AuthContext";
import { User } from "../components/SideBar";

type Props = {
  children: ReactNode;
};

interface Action {
  type: ActionKind;
  payload: User;
}
enum ActionKind {
  CHANGE_USER = "CHANGE_USER",
  RESET = "RESET",
}

export const ChatContext = createContext<any>({});
export const ChatProvider = ({ children }: Props) => {
  const currentUser = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "",
    userInfo: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case ActionKind.CHANGE_USER:
        return {
          userInfo: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? `${currentUser.uid}_${action.payload.uid}`
              : `${action.payload.uid}_${currentUser.uid}`,
        };
      case ActionKind.RESET:
        return INITIAL_STATE;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
