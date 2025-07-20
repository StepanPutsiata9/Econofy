import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ModalForCard.ts';
import Arrow from '../../../../components/SvgComponents/Arrow.tsx';
import TrashBin from '../../../../components/SvgComponents/TrashBin.tsx';

type IModalProps = {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
};
function ModalForCard({ modalVisible, setModalVisible }: IModalProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      <TouchableOpacity
        style={[styles.fullScreenModal, { marginTop: -insets.top }]}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.addView}>
            <Text style={styles.infoText}>Добавить сумму</Text>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            >
              <Arrow color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
          <View style={styles.minusView}>
            <Text style={styles.infoText}>Убрать сумму</Text>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            >
              <Arrow color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>

          <View style={styles.delView}>
            <Text style={styles.delText}>Удалить цель</Text>
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            >
              <TrashBin />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default ModalForCard;
