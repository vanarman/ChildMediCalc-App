import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import "./lang/i18n";
import BottomTabMenu from "./components/BottomTabMenu";
import Navigator from "./components/Navigator";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Navigator />
        <StatusBar style="auto" />
        <BottomTabMenu />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
