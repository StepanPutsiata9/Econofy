import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './ModalForCard.ts';
import Arrow from '../../../../components/SvgComponents/Arrow.tsx';
import TrashBin from '../../../../components/SvgComponents/TrashBin.tsx';
import { deleteGoal, Target } from '../../../../store/slices/Home.slice.ts';
import { useAppDispatch } from '../../../../store/store.ts';
import { useState } from 'react';
import AddMoneyModal from '../AddMoneyModal/AddMoneyModal.tsx';
import MinusMoneyModal from '../MinusMoneyModal/MinusMoneyModal.tsx';
type IModalProps = {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  item: Target;
};
function ModalForCard({ modalVisible, setModalVisible, item }: IModalProps) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const closeAddModal = () => {
    setAddModalVisible(false);
    setModalVisible(true);
  };
  const [minusModalVisible, setMinusModalVisible] = useState<boolean>(false);
  const closeMinusModal = () => {
    setMinusModalVisible(false);
    setModalVisible(true);
  };
  return (
    <>
      <AddMoneyModal
        addModalVisible={addModalVisible}
        closeAddModal={closeAddModal}
        item={item}
      />
      <MinusMoneyModal
        minusModalVisible={minusModalVisible}
        closeMinusModal={closeMinusModal}
        item={item}
      />
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
            <Text>{item.title}</Text>

            <View style={styles.addView}>
              <Text style={styles.infoText}>Добавить сумму</Text>
              <TouchableOpacity
                onPress={() => {
                  setAddModalVisible(true);
                  setModalVisible(false);
                }}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
              >
                <Arrow color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
            <View style={styles.minusView}>
              <Text style={styles.infoText}>Отнять сумму</Text>
              <TouchableOpacity
                onPress={() => {
                  setMinusModalVisible(true);
                  setModalVisible(false);
                }}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
              >
                <Arrow color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>

            <View style={styles.delView}>
              <Text style={styles.delText}>Удалить цель</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteGoal(item.id));
                }}
                hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
              >
                <TrashBin />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default ModalForCard;
