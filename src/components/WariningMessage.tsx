import { Center, Text } from "@gluestack-ui/themed";

interface WarningMessageProps {
  text: string;
}

const WarningMessage = ({ text }: WarningMessageProps) => {
  return (
    <Center
      bg="$pink50"
      borderCurve="circular"
      borderColor="$red600"
      m="$2"
      borderRadius="$md"
      borderWidth={1}
    >
      <Text color="$textDark800" p="$5" fontSize="$md">
        {text}
      </Text>
    </Center>
  );
};

export default WarningMessage;
