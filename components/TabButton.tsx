import { Pressable, Center, Text } from "@gluestack-ui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Icon from "./Icon";
import { RootStackParamList } from 'models/ScreenNavigation';

interface TabButttonProps {
  name: keyof RootStackParamList;
  iconName: string;
  label: string;
}

const TabButton = ({
  name,
  iconName,
  label,
}: TabButttonProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable onPress={() => {navigation.navigate(name)}}>
      <Center p="$2" w="$24">
        <Icon name={iconName} color="#E5F1FB" size={32} strokeWidth={1} />
        <Text color="$primary0">{label}</Text>
      </Center>
    </Pressable>
  );
}

export default TabButton;