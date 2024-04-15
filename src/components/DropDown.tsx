import { 
  Select,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import { ChevronDown } from "lucide-react-native";
import { Dispatch } from "react";

export type SelectItem = {
  label: string;
  value: string;
  isDisabled?: boolean;
}

interface dropDownProps {
  value?: string,
  data: SelectItem[],
  triggetSize?: 'xl' | 'lg' | 'md' | 'sm',
  inputVariant?: 'underlined' | 'outline' | 'rounded',
  onChange: Dispatch<any>,
  placeholder?: string;
}

const DropDown = ({
  data,
  value,
  triggetSize = 'lg',
  inputVariant = 'outline',
  placeholder = 'Select option',
  onChange
}: dropDownProps) => {
  return (
    <Select onValueChange={onChange} minWidth="$full" selectedValue={data.find(item => item.value === value)?.label}>
      <SelectTrigger variant={inputVariant} size={triggetSize} pr="$3">
        <SelectInput placeholder={placeholder}/>
        <SelectIcon>
          <ChevronDown strokeWidth={3} size={24} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
        <SelectDragIndicatorWrapper>
          <SelectDragIndicator />
        </SelectDragIndicatorWrapper>
        {data.map((item, index) => {
          return <SelectItem label={item.label} value={item.value} key={item.value} />
        })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

export default DropDown;