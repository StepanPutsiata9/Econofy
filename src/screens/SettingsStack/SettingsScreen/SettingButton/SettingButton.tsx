import { TouchableOpacity, View, Text } from 'react-native';
import Arrow from '../../../../components/SvgComponents/Arrow';
import { styles } from './SettingButton.ts';
import api from '../../../../store/slices/AuthSlice/api.ts';

function SettingButton() {
  return (
    <View style={styles.settingView}>
      <Text style={styles.settingText}>Установить фото аккаунта</Text>
      <TouchableOpacity
        onPress={() => {
          api.get('');
          console.log('get to backend');
        }}
        hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
      >
        <Arrow color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>
  );
}
export default SettingButton;
