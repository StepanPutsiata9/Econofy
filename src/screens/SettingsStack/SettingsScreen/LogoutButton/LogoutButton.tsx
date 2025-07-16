import { TouchableOpacity, View, Text, Modal, StatusBar } from 'react-native';
import Arrow from '../../../../components/SvgComponents/Arrow';
import { styles } from './LogoutButton.ts';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logout } from '../../../../store/slices/AuthSlice/Auth.slice.ts';
import { useAppDispatch } from '../../../../store/store.ts';

function LogoutButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
  
  const handleLogout = async() => {
    await dispatch(logout());
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.logoutView}>
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
        >
          <Arrow color={'#FF1B44'} />
        </TouchableOpacity>
      </View>

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
        <View style={[styles.fullScreenModal,{marginTop:-insets.top}]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Подтверждение действия</Text>
            <Text style={styles.modalText}>
              Вы действительно хотите выйти из аккаунта?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Выйти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default LogoutButton;
