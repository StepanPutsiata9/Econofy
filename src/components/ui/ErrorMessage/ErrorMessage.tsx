import { View, Text, Modal, Pressable } from 'react-native';
import { styles } from './ErrorMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

type ErrorProps={
    onClose:()=>void;
}
function ErrorMessage({onClose}:ErrorProps) {
  const [modalVisible, setModalVisible] = useState(true);
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={[
          styles.centeredView,
          {
            marginBottom: insets.bottom + 15,
          },
        ]}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Что-то пошло не так!</Text>
          <Text style={styles.checkInet}>Проверьте интернет-соедениение.</Text>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              onClose();
            }}
          >
            <Text style={styles.textStyle}>Попробовать еще раз</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ErrorMessage;
