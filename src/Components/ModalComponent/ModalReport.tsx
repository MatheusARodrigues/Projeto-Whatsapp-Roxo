import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { getThemeStyles, useTheme } from "../Tema/themeContext";
import { reportStyles } from "./style";

type ModalReportProps = {
  visible: boolean;
  onClose: () => void;
  onSelectReason: (reason: string) => void;
  name: string;
};

const reasons = [
  "Assédio ou Bullying",
  "Conteúdo Violento ou Explícito",
  "Discurso de Ódio",
  "Fraude ou Spam",
  "Suicídio ou Automutilação",
  "Privacidade Violada",
  "Conteúdo Ilegal",
  "Terrorismo",
];

export function ModalReport({
  visible,
  onClose,
  onSelectReason,
  name,
}: ModalReportProps) {
    const { theme} = useTheme();
    const themeStyles = getThemeStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={reportStyles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={themeStyles.modalView}>
              <Text style={themeStyles.modalTitle}>Denunciar {name}</Text>
              {reasons.map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={reportStyles.reasonButton}
                  onPress={() => {
                    onSelectReason(reason);
                    onClose();
                  }}
                >
                  <Text style={themeStyles.reasonText}>{reason}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )};