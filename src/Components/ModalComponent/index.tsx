import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { styles} from './style'
import { useAuth } from '../../Hooks/useAuth';

export function ModalComponent() {

  const {modalAberto, setModalAberto} = useAuth();

  return (
    <Modal transparent={true} visible={modalAberto} animationType="slide">

      <View style={styles.containerModal}>
        <View style={styles.container}>

          <Text style={styles.title}>
            Credenciais invalidas!
            </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalAberto(!modalAberto)}
          >
            <Text style={styles.titleButton}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  )
}