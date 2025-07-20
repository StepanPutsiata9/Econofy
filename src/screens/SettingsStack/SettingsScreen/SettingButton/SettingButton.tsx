import { TouchableOpacity, View, Text, Modal, StatusBar } from 'react-native';
import Arrow from '../../../../components/SvgComponents/Arrow';
import { styles } from './SettingButton.ts';
// import api from '../../../../store/slices/AuthSlice/api.ts';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AvatarUploader from './AvatarUploader.tsx';
function SettingButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={styles.settingView}>
        <Text style={styles.settingText}>Установить фото аккаунта</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
        >
          <Arrow color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.fullScreenModal, { marginTop: -insets.top }]}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <AvatarUploader />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
export default SettingButton;
