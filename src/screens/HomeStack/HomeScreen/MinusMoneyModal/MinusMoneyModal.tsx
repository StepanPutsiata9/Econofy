import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './MinusMoneyModal.ts';
import { minusGoal, Target } from '../../../../store/slices/Home.slice.ts';
import MainButton from '../../../../components/ui/MainButton/MainButton.tsx';
import { useState } from 'react';
import MoneyInput from '../MoneyInput/MoneyInput.tsx';
import { useAppDispatch } from '../../../../store/store.ts';

type IModalProps = {
  minusModalVisible: boolean;
  closeMinusModal: () => void;
  item: Target;
};
function MinusMoneyModal({
  minusModalVisible,
  closeMinusModal,
  item,
}: IModalProps) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState<string>('0');
  const dispatch = useAppDispatch();
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
            <MoneyInput amount={amount} setAmount={setAmount} />
            <MainButton
              title={'Отнять'}
              onClick={() => {
                dispatch(
                  minusGoal({
                    id: item.id,
                    savedMoney: Number(amount),
                  }),
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default MinusMoneyModal;
