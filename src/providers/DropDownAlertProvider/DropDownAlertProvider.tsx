import React, {
  FunctionComponent,
  createContext,
  useContext,
  useMemo,
} from "react";
import Toast, { BaseToast } from "react-native-toast-message";

import { styles } from "./DropDownAlertProvider.styles";

export const DropdownAlertType = {
  Success: "success",
  Error: "error",
  Info: "info",
  Warn: "warning",
} as const;

export type DropdownAlertType =
  (typeof DropdownAlertType)[keyof typeof DropdownAlertType];

export type DropDownAlertContext = {
  messageFromServer: (
    message: string,
    title?: string,
    type?: DropdownAlertType
  ) => Promise<void>;
  showMessageServer: (
    title: string,
    message: string,
    type?: DropdownAlertType
  ) => Promise<void>;
};

export type DropDownAlertProviderProps = {
  children: React.ReactNode;
};

export const dropDownAlertContext = createContext({} as DropDownAlertContext);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1Style={styles.titleTextStyle}
      text2Style={styles.messageTextStyle}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      text1Style={styles.titleTextStyle}
      text2Style={styles.messageTextStyle}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      text1Style={styles.titleTextStyle}
      text2Style={styles.messageTextStyle}
    />
  ),
};

const DropDownAlertProvider: FunctionComponent<DropDownAlertProviderProps> = ({
  children,
}) => {
  const getToastType = (type: DropdownAlertType) => {
    if (type === DropdownAlertType.Warn) return "info";
    return type;
  };

  const showMessageServer = async (
    title: string,
    message: string,
    type: DropdownAlertType = DropdownAlertType.Info
  ) => {
    Toast.show({
      type: getToastType(type),
      text1: title,
      text2: message,
    });
  };

  const messageFromServer = async (
    message: string,
    title = "Message from the server",
    type: DropdownAlertType = DropdownAlertType.Info
  ) => {
    await showMessageServer(title, message, type);
  };

  const contextValue: DropDownAlertContext = useMemo(
    () => ({ messageFromServer, showMessageServer }),
    []
  );

  return (
    <dropDownAlertContext.Provider value={contextValue}>
      <Toast config={toastConfig} />
      {children}
    </dropDownAlertContext.Provider>
  );
};

export const useDropDownAlertProvider = () => useContext(dropDownAlertContext);

export default DropDownAlertProvider;
