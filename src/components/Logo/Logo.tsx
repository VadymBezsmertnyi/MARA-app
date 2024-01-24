import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

// components
import { ImageCache } from "../ImageCache/ImageCache";

// images
import imageLogo from "../../../assets/adaptive-icon.png";

// styles
import { styles } from "./Logo.styles";

export const Logo: FunctionComponent = () => (
  <View style={styles.containerLogo}>
    <ImageCache imageSrc={imageLogo} style={styles.imageLogo} />
    <Text style={styles.titleLogo}>Moto Auto Road Assistant</Text>
  </View>
);
