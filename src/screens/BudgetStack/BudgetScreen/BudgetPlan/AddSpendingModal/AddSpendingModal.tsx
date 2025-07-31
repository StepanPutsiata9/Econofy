import { Modal, StatusBar, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AddSpendingModal.ts';

import MainButton from '../../../../../components/ui/MainButton/MainButton.tsx';
import React, { useState } from 'react';
import MoneyInput from '../../../../../components/ui/MoneyInput/MoneyInput.tsx';
import { Dropdown } from 'react-native-element-dropdown';

type IModalProps = {
  addModalVisible: boolean;
  setAddModalVisible: (value: boolean) => void;
};

enum Categories {
  STORE = 'Продукты',
  COSMETICS = 'Косметика',
  HOUSEHOLD = 'Быт. товары',
  TRANSPORT = 'Общ. транспорт',
  HOUSING_AND_COMMUNAL_SERVICES = 'ЖКУ',
  HEALTH = 'Здоровье',
  INTERNET = 'Связь/Интернет',
  HOBBY = 'Хобби',
  LOANS = 'Кредиты',
  CLOTH = 'Одежда, быт',
  UNFORESSEN_EXPENSES = 'Непредвиденная трата',
  AIRBAG = 'Подушка безопасности',
  ADDITIONAL_EXPENSES = 'Доп.расходы',
}

const data = Object.values(Categories).map(category => ({
  label: category,
  value: category,
}));

function AddSpendingModal({
  addModalVisible,
  setAddModalVisible,
}: IModalProps) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={addModalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <TouchableOpacity
          style={[styles.fullScreenModal, { marginTop: -insets.top }]}
          onPress={() => setAddModalVisible(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>Категория:</Text>
              <View style={styles.currentCategoryView}>
                <Dropdown
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder='Выберите категорию'
                  value={selectedCategory}
                  onChange={item => setSelectedCategory(item.value)}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.dropdownContainer}
                  itemTextStyle={styles.itemTextStyle}
                  activeColor="#242424"
                  iconStyle={styles.hiddenIcon} 
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
            <MoneyInput amount={amount} setAmount={setAmount} />
            <MainButton title={'Добавить'} onClick={() => {}} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default AddSpendingModal;
