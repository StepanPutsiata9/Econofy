import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import { styles } from './ErrorMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import LoadPig from '../../SvgComponents/LoadPig';

type ErrorProps = {
  onClose: () => void;
};
function ErrorMessage({ onClose }: ErrorProps) {
  const [modalVisible, setModalVisible] = useState(true);
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ flex: 1, marginTop: 100, alignItems: 'center' }}>
        <LoadPig />
        <Text
          style={{
            color: '#5BFF6F',
            fontSize: 30,
            fontFamily: 'MontserratBold',
            marginTop: 20,
          }}
        >
          Что то пошло не так!
        </Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.centeredView,
              {
                marginBottom: insets.bottom + 15,
              },
            ]}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Что-то пошло не так!</Text>
              <Text style={styles.checkInet}>
                Проверьте интернет-соедениение.
              </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  onClose();
                }}
              >
                <Text style={styles.textStyle}>Попробовать еще раз</Text>
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default ErrorMessage;
