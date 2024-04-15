import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DoseCalculatorScreen, CheoWaitTimeScreen } from "../screens";

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="WaitTime"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="WaitTime" component={CheoWaitTimeScreen} />
			<Stack.Screen name="Calculator" component={DoseCalculatorScreen} />
		</Stack.Navigator>
	);
}

export default Navigator;