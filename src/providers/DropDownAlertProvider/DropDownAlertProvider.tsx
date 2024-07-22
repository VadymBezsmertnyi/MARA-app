import React, {
  FunctionComponent,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Text } from "react-native";
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from "react-native-dropdownalert";

// styles
import { styles } from "./DropDownAlertProvider.styles";

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

const DropDownAlertProvider: FunctionComponent<DropDownAlertProviderProps> = ({
  children,
}) => {
  let alert = (_data: DropdownAlertData) =>
    new Promise<DropdownAlertData>((res) => res);

  const showMessageServer = async (
    title: string,
    message: string,
    type: DropdownAlertType = DropdownAlertType.Info
  ) => {
    await alert({
      type,
      title,
      message,
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
    [alert]
  );

  return (
    <dropDownAlertContext.Provider value={contextValue}>
      <DropdownAlert
        alert={(func) => (alert = func)}
        imageStyle={styles.imageStyle}
        titleTextStyle={styles.titleTextStyle}
        renderMessage={(messageData) => (
          <Text style={styles.messageTextStyle}>{messageData.message}</Text>
        )}
      />
      {children}
    </dropDownAlertContext.Provider>
  );
};

export const useDropDownAlertProvider = () => useContext(dropDownAlertContext);

export default DropDownAlertProvider;
