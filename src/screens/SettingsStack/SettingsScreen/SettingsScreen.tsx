import { View, Text } from 'react-native';
import PageCoin from '../../../components/SvgComponents/PageCoin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SettingsScreen.ts';
import LogoutButton from './LogoutButton/LogoutButton.tsx';
import SettingButton from "./SettingButton/SettingButton.tsx"
function Settings() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.titleView}>
        <Text style={styles.title}>Настройки</Text>
        <PageCoin />
      </View>
      <SettingButton/>
      <LogoutButton />
    </View>
  );
}
export default Settings;
