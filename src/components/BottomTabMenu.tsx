import { Box, HStack} from "@gluestack-ui/themed"
import { useTranslation } from "react-i18next";

import TabButton from "./TabButton";

const BottomTabMenu = () => {
  const { t } = useTranslation();

  return (
    <Box bg="$fuchsia900" width="$full" height="$24" pb="$4" alignSelf="center" justifyContent="center">
      <HStack alignSelf="center" gap="$5" >
        <TabButton name="WaitTime" label={t('screens.iconTitle.waitTime')} iconName="Hourglass" />
        <TabButton name="Calculator" label={t('screens.iconTitle.calculator')} iconName="Calculator" />
      </HStack>
    </Box>
  );
}

export default BottomTabMenu;
