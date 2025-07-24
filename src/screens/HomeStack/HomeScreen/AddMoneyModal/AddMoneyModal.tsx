import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AddMoneyModal.ts';

import {  Target } from '../../../../store/slices/Home.slice.ts';
import MainButton from '../../../../components/ui/MainButton/MainButton.tsx';
import React, { useState } from 'react';
import MoneyInput from '../MoneyInput/MoneyInput.tsx';

type IModalProps = {
  addModalVisible: boolean;
  closeAddModal: () => void;
  item: Target;
};
function AddMoneyModal({ addModalVisible, closeAddModal, item }: IModalProps) {
  const insets = useSafeAreaInsets();
    const [amount,setAmount]=useState<string>("0");

  return (
    <>
    <Modal
      animationType="fade"
      transparent={true}
      visible={addModalVisible}
      statusBarTranslucent={true}
      onRequestClose={closeAddModal}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      <TouchableOpacity
        style={[styles.fullScreenModal, { marginTop: -insets.top }]}
        onPress={closeAddModal}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <Text>Добавить {item.title}</Text>
          <MoneyInput amount={amount} setAmount={setAmount}/>
          <MainButton title={"Добавить"} onClick={()=>{}}/>
        </View>
      </TouchableOpacity>
    </Modal>
    </>
  );
}

export default AddMoneyModal;

