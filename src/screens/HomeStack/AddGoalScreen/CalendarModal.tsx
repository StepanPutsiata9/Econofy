import { Calendar } from 'react-native-calendars';
import {
  Modal,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DatePickerProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
};
function DatePickerModal({
  isVisible,
  setIsVisible,
  selectedDate,
  setSelectedDate,
}: DatePickerProps) {
  const insets = useSafeAreaInsets();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      <TouchableOpacity
        style={[styles.fullScreenModal, { marginTop: -insets.top }]}
        onPress={() => setIsVisible(false)}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <Calendar
            onDayPress={day => {
              setSelectedDate(formatDate(day.dateString));
              setIsVisible(false);
            }}
            markedDates={{ [selectedDate]: { selected: true } }}
          />
          
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
});

export default DatePickerModal;
