import { 
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  FormControlHelper,
  FormControlHelperText,
} from "@gluestack-ui/themed";
import { Dispatch } from "react";
import { InputModeOptions, KeyboardTypeOptions } from "react-native";

interface TextInputProps {
  label?: string,
  helpText?: string,
  value: string,
  inputMode?: InputModeOptions | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChange: Dispatch<any>,
}

const TextInput = ({
  label,
  helpText,
  inputMode,
  keyboardType,
  value,
  onChange,
}: TextInputProps) => {

  return (
    <FormControl minWidth="$full">
      {!label ? null : 
        <FormControlLabel>
          <FormControlLabelText fontSize="$lg">{label}</FormControlLabelText>
        </FormControlLabel>
      }
      <Input>
        <InputField 
          allowFontScaling
          inputMode={inputMode}
          keyboardType={keyboardType}
          onChangeText={onChange}
          value={value}
        />
      </Input>
      {!helpText ? null :
        <FormControlHelper>
          <FormControlHelperText>
            {helpText}
          </FormControlHelperText>
        </FormControlHelper>
      }
    </FormControl>
  );
}

export default TextInput;