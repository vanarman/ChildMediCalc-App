import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SafeAreaView from "react-native-safe-area-view";
import { View, Button, ButtonText, Center, Heading, Text, Box, VStack, Toast, ToastTitle, ToastDescription, useToast, HStack } from "@gluestack-ui/themed";
import drugsData from '../data/medicine.json';
import { WeightUnits } from "../models/WeightUnits";
import { DrugType } from "../models/DrugType";
import { Drug } from "../models/Drug";
import DropDown, { SelectItem } from "../components/DropDown";
import TextInput from "../components/TextInput";
import PopUpDialog from "../components/PopUpDialog";
import { AgeUnits } from "../models/AgeUnits";
import WarningMessage from "components/WariningMessage";
import Icon from "components/Icon";

const DoseCalculatorScreen = () => {
  const [selectedDrug, setSelectedDrug] = useState<Drug | undefined>(undefined);
  const [selectedWeight, setSelectedWeigth] = useState<WeightUnits>(WeightUnits.KG);
  const [selectedAge, setSelectedAge] = useState<AgeUnits>(AgeUnits.MONTH);
  const [calculatedDose, setCalculatedDose] = useState<number | null>(null);
  const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
  const [errorAlertText, setErrorAlertText] = useState<string>('');
  const [weight, setWeight] = useState<string>('0');
  const [age, setAge] = useState<string>('0');
  const toast = useToast()
  const { t } = useTranslation();

  const changeDrug = (value: string) => {
    setSelectedDrug((drugsData as Drug[]).find((item) => item.id === value))
  }

  const changeWeight = (value: number) => {
    setSelectedWeigth(value as WeightUnits)
  }

  const calculateDose = () => {
    if (!selectedWeight || !selectedDrug ) return;

    const convertedWeight: number =
        selectedWeight == WeightUnits.LB ? Number(weight) / 2.205 : Number(weight);
    const convertedAge: number = 
        selectedAge == AgeUnits.YEAR ? Number(age) * 12 : Number(age);

    if (convertedWeight <= 0) {
      setErrorAlertText(t('calculator.errors.incorrectWeight'));
      return;
    }

    if (selectedDrug.requireAge && convertedAge <= 0) {
      setErrorAlertText(t('calculator.errors.unsetAge'));
      return;
    }

    if (selectedDrug.maxAge && selectedDrug.maxAge < convertedAge) {
      setErrorAlertText(t('calculator.errors.unsutibleDrugByAge'));
    }

    if (selectedDrug?.type === DrugType.TYLENOL) {
      // Acetaminophen 15 mg/kg
      setCalculatedDose((convertedWeight * 15) / selectedDrug.dose);
    } else if (selectedDrug?.type === DrugType.ADVIL && convertedAge >= 1 && convertedAge < 6) {
      // Ibuprophen 5 mg/kg (1-6 month)
      setCalculatedDose((convertedWeight * 5) / selectedDrug.dose);
    } else if (selectedDrug?.type === DrugType.ADVIL && convertedAge >= 6) {
      // Ibuprophen 10 mg/kg (>6 month)
      setCalculatedDose((convertedWeight * 10) / selectedDrug.dose);
    }

    setDialogVisibility(true);
  };

  useEffect(() => {
    if (errorAlertText != '') {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="error" variant="accent" bg="$pink50">
              <VStack>
                <HStack space="md" alignItems="center">
                  <Icon name="TriangleAlert" color="#dc2626" strokeWidth={2}/>
                  <ToastTitle bold fontSize="$lg" color="$red600">{t('defaults.errorTitle')}</ToastTitle>
                </HStack>
                <ToastDescription fontSize="$md">{errorAlertText}</ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    }

    return () => setErrorAlertText('');
  }, [errorAlertText]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <WarningMessage text={t('calculator.topPageWarning')}/>
        <Center gap={10} px="$5">
          <DropDown
            placeholder={t('calculator.drugDropdown.placeholder')}
            data={(drugsData as Drug[]).map((item: Drug) => {
              return {
                value: item.id, 
                label: t(`drugsData.${item.id}.name`)
              } as SelectItem
            })}
            onChange={changeDrug}
          />
          {selectedDrug && <>
            <Text fontSize="$lg">{t(`drugsData.${selectedDrug.id}.description`)}</Text>

            <TextInput
              value={weight}
              label={t('calculator.weight')}
              inputMode='numeric'
              onChange={text => setWeight(text)}
            />
            <DropDown
              value={selectedWeight.toString()}
              placeholder={t('calculator.weightDropdown.placeholder')}
              data={[{label: 'kg', value: WeightUnits.KG.toString()}, {label: 'lb', value: WeightUnits.LB.toString()}]}
              onChange={changeWeight}
            />
            { !selectedDrug.requireAge ? null :
              <>
                <TextInput
                  value={age}
                  label={t('calculator.age')}
                  inputMode='numeric'
                  onChange={text => setAge(text)}
                />
                <DropDown
                  value={selectedAge.toString()}
                  placeholder={t('calculator.ageDropdown.placeholder')}
                  data={[{label: 'Month(s)', value: AgeUnits.MONTH.toString()}, {label: 'Year(s)', value: AgeUnits.YEAR.toString()}]}
                  onChange={setSelectedAge}
                />
              </>
            }
            <Button onPress={calculateDose} bg="$fuchsia700" p="$2">
              <Icon name="Calculator" color="#E5F1FB" strokeWidth={2}/>
              <ButtonText fontSize="$2xl" pl="$3">{t('calculator.calulateBtn')}</ButtonText>
            </Button>
            { !!calculatedDose ? 
              <PopUpDialog
                show={dialogVisibility}
                setShow={setDialogVisibility}
                header={t('calculator.dilaog.header')}
                body={
                  <Box>
                    <VStack space="md">
                      <WarningMessage text={t('calculator.dilaog.bodyWaringBody')} />
                      <Center borderColor="$secondary800" h={100} borderCurve="circular" opacity={0.6}>
                        <Text fontSize="$7xl" color="$secondary800">
                          {t(`drugsData.${selectedDrug.id}.calculatedDoseUnit`, 
                            { dose: (Math.round((calculatedDose + Number.EPSILON) * 100) / 100).toFixed(1)})}
                        </Text>
                      </Center>
                    </VStack>
                  </Box>
                }
              /> :
              null
            }
        
          </>}
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default DoseCalculatorScreen;