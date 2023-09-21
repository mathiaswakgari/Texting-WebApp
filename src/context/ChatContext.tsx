import { ReactNode, createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

type Props = {
  children: ReactNode;
};

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
