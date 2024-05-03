import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBackdrop,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogBody,
  ButtonGroup,
  ButtonText,
  Center,
  Heading,
  Text,
  Button,
} from "@gluestack-ui/themed";
import { X } from "lucide-react-native";
import { ReactElement, useRef, Dispatch } from "react";
import { useTranslation } from "react-i18next";

interface PopUpDialogProps {
  header?: string;
  body: string | ReactElement;
  show?: boolean;
  bgColor?: string;
  setShow?: Dispatch<any>;
  onConfirm?: Dispatch<any>;
  onCancel?: Dispatch<any>;
}

const PopUpDialog = ({
  show = false,
  body,
  header,
  bgColor = "$white",
  setShow = () => {},
  onCancel = () => {},
  onConfirm,
}: PopUpDialogProps) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  return (
    <Center h={300} ref={ref}>
      <AlertDialog
        isOpen={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent backgroundColor={bgColor}>
          <AlertDialogHeader>
            {!header ? null : (
              <Heading size="lg" color="$secondary800">
                {header}
              </Heading>
            )}
            <AlertDialogCloseButton
              onPress={() => {
                setShow(false);
                onCancel;
              }}
            >
              <X strokeWidth={3} color="#262626" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            {typeof body === "string" ? (
              <Text size="sm" color="$secondary800">
                {body}
              </Text>
            ) : (
              body
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              {!onCancel ? (
                <></>
              ) : (
                <Button
                  bg="$fuchsia700"
                  variant="outline"
                  action="secondary"
                  onPress={() => {
                    setShow(false);
                    onCancel;
                  }}
                >
                  <ButtonText color="$white">{t("defaults.close")}</ButtonText>
                </Button>
              )}
              {!onConfirm ? (
                <></>
              ) : (
                <Button
                  bg="$tertiary900"
                  action="negative"
                  onPress={() => {
                    setShow(false);
                    onConfirm;
                  }}
                >
                  <ButtonText color="$white">
                    {t("defaults.confirm")}
                  </ButtonText>
                </Button>
              )}
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

export default PopUpDialog;
