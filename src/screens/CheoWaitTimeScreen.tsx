import { Center, Spinner, Text, View } from "@gluestack-ui/themed";
import WarningMessage from "src/components/WariningMessage";
import { useEffect, useState } from "react";
import { CHEO_WAIT_TIME_URL } from '@env';
import { useTranslation } from "react-i18next";
import SafeAreaView from "react-native-safe-area-view";

interface waitTimeData {
  "aveWaitMin": number,
  "patientCount": number,
  "longestWaitMin": number,
  "lastUpdated": string
}

const CheoWaitTimeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [waitData, setWaitData] = useState<waitTimeData | null>(null);
  const { t } = useTranslation();

  async function pullWaitData() {
    try {
      const data = await fetch(CHEO_WAIT_TIME_URL)
                      .then((response) => response.json() );
      setWaitData(data);
    }
    catch(err) {
      // setError(true);
    }
    finally {
      setLoading(false);
    }
  }

  const time_convert = (time: number) => { 
    var hours = Math.floor(time / 60);  
    var minutes = Math.round(time % 60);
    return hours +"h "+ minutes +"m";         
  }

  useEffect(() => {
    pullWaitData();

    const interval = setInterval(() => {
      setLoading(true);
      pullWaitData();
    }, 900000); // Update every 15 min
  
    return () => clearInterval(interval);
  }, []);

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WarningMessage text={t('cheoWaitTime.warningMessage')} />
        <Center alignItems="center" flexGrow={2}>
          { loading ? <Spinner size="large" color="$fuchsia900" /> : 
            <>
              <Center flexGrow={1} alignContent="center">
                <Text allowFontScaling bold fontSize="$8xl" color="$fuchsia900">
                  {waitData?.aveWaitMin && time_convert(waitData?.aveWaitMin)}
                </Text>
                <Text allowFontScaling textAlign="center" fontSize="$md" color="$textDark800">{t('cheoWaitTime.avarageWait')}</Text>
                <Text allowFontScaling bold fontSize="$8xl" color="$fuchsia900">
                  {waitData?.longestWaitMin && time_convert(waitData?.longestWaitMin)}
                </Text>
                <Text allowFontScaling textAlign="center" fontSize="$md" color="$textDark800">{t('cheoWaitTime.longestWait')}</Text>
                <Text allowFontScaling bold fontSize="$8xl" color="$fuchsia900">{waitData?.patientCount && waitData?.patientCount}</Text>
                <Text allowFontScaling textAlign="center" fontSize="$md" color="$textDark800">{t('cheoWaitTime.patientsInLine')}</Text>            
              </Center>
              <Center flexGrow={0.5} justifyContent="flex-end">
                <Text fontSize="$sm">{t('cheoWaitTime.lastUpdateTime', { updateTime: new Date().toLocaleString()})}</Text>
              </Center>
            </>
          }
        </Center>
      </View>
    </SafeAreaView>
  );
}

export default CheoWaitTimeScreen;