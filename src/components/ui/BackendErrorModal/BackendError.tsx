import { Modal, StatusBar, TouchableOpacity, View,Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BackendError.ts';

type IModalProps = {
  errorModalVisible: boolean;
  setErrorModalVisible: (value:boolean) => void;
  onPress:()=>void;
};
function BackendError({ errorModalVisible, setErrorModalVisible,onPress }: IModalProps) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        statusBarTranslucent={true}
        onRequestClose={()=>setErrorModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <TouchableOpacity
          style={[styles.fullScreenModal, { marginTop: -insets.top}]}
          onPress={()=>setErrorModalVisible(false)}
        >
          <View
            style={[styles.modalContent,{marginBottom:insets.bottom+15}]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.errorText}>Что-то пошло не так!</Text>
            <Text style={styles.bigSummText}>Проверьте интернет-соединение.</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.tryAgainText}>Попробовать еще раз.</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default BackendError;
