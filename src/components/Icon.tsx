import { icons, LucideIcon } from "lucide-react-native";

type StringKeys = Extract<keyof typeof icons, string>;

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const Icon = ({
  name,
  color = "#FFFFFF",
  size = 24,
  strokeWidth = 1,
}: IconProps) => {
  const LucideIcon: LucideIcon = icons[name as StringKeys];
  return <LucideIcon color={color} size={size} strokeWidth={strokeWidth} />;
};

export default Icon;
