import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { StatusBar } from 'expo-status-bar';
import './lang/i18n';
import Navigator from './components/Navigator';
import BottomTabMenu from "./components/BottomTabMenu";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Navigator/>
        <StatusBar style="auto" />
        <BottomTabMenu />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
