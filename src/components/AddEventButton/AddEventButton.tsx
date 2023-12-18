import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './AddEventButton.styles';

type AddEventButtonProps = {
  onPress: () => void;
};

export const AddEventButton: FunctionComponent<AddEventButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.createNewEvent} onPress={onPress}>
    <View style={styles.createNewEventWrapper}>
      <View style={styles.horizontal} />
      <View style={styles.vertical} />
    </View>
  </TouchableOpacity>
);
