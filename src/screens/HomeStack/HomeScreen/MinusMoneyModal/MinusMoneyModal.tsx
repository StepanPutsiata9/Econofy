import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './MinusMoneyModal.ts';
import {  Target } from '../../../../store/slices/Home.slice.ts';


type IModalProps = {
  minusModalVisible: boolean;
  closeMinusModal: () => void;
  item: Target;
};
function MinusMoneyModal({ minusModalVisible, closeMinusModal, item }: IModalProps) {
  const insets = useSafeAreaInsets();


  return (
    <>
    <Modal
      animationType="fade"
      transparent={true}
      visible={minusModalVisible}
      statusBarTranslucent={true}
      onRequestClose={closeMinusModal}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      <TouchableOpacity
        style={[styles.fullScreenModal, { marginTop: -insets.top }]}
        onPress={closeMinusModal}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <Text>Отнять {item.title}</Text>

        </View>
      </TouchableOpacity>
    </Modal>
    </>
  );
}

export default MinusMoneyModal;
