import { Modal, StatusBar, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './AddSpendingModal.ts';

import MainButton from '../../../../../components/ui/MainButton/MainButton.tsx';
import React, { useState } from 'react';
import MoneyInput from '../../../../../components/ui/MoneyInput/MoneyInput.tsx';
import { Dropdown } from 'react-native-element-dropdown';
import { addSpendingToPlan } from '../../../../../store/slices/Budget.slice.ts';
import { useAppDispatch } from '../../../../../store/store.ts';
import { IBudgetPlanItem } from '../BudgetPlan.tsx';
import ErrorModal from '../ErrorModal/ErrorModal.tsx';
type IModalProps = {
  addModalVisible: boolean;
  setAddModalVisible: (value: boolean) => void;
  item: IBudgetPlanItem;
};

export enum Categories {
  STORE_AND_HOUSEHOLD = 'Продукты, быт. товары',
  COSMETICS = 'Косметика',
  TRANSPORT = 'Общ. транспорт',
  HOUSING_AND_COMMUNAL_SERVICES = 'ЖКУ',
  HEALTH = 'Здоровье',
  INTERNET = 'Связь/Интернет',
  HOBBY = 'Хобби',
  LOANS = 'Кредиты',
  CLOTH = 'Одежда, быт',
  UNFORESSEN_EXPENSES = 'Непредвиденные расходы',
  AIRBAG = 'Подушка безопасности',
  ADDITIONAL_EXPENSES = 'Дополнительные расходы',
}

const data = Object.values(Categories).map(category => ({
  label: category,
  value: category,
}));

function AddSpendingModal({
  addModalVisible,
  setAddModalVisible,
  item,
}: IModalProps) {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };
  return (
    <>
      <ErrorModal
        errorModalVisible={errorModalVisible}
        closeErrorModal={closeErrorModal}
      />
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
                  placeholder="Выберите категорию"
                  value={selectedCategory}
                  onChange={selectedItem =>
                    setSelectedCategory(selectedItem.value)
                  }
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
            <MainButton
              title={'Добавить'}
              onClick={() => {
                Number(amount) > Number(item.remainder)
                  ? setErrorModalVisible(true)
                  : dispatch(
                      addSpendingToPlan({
                        id: item.id,
                        spendedMoney: Number(amount),
                        category:
                          (selectedCategory as Categories) ||
                          ('Непредвиденные расходы' as Categories),
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

export default AddSpendingModal;
