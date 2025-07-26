import { Modal, StatusBar, TouchableOpacity, View,Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ErrorModal.ts';

type IModalProps = {
  errorModalVisible: boolean;
  closeErrorModal: () => void;
};
function ErrorModal({ errorModalVisible, closeErrorModal }: IModalProps) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        statusBarTranslucent={true}
        onRequestClose={closeErrorModal}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <TouchableOpacity
          style={[styles.fullScreenModal, { marginTop: -insets.top}]}
          onPress={closeErrorModal}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.errorText}>Ошибка!</Text>
            <Text style={styles.bigSummText}>Вы пытаетесь отнять слишком большую сумму!</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default ErrorModal;
