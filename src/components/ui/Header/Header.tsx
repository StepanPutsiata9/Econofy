import { Text, View } from 'react-native';
import {styles} from "./Header"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[
      styles.header,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }
    ]}>
      <Text style={styles.headerText}>Econofy</Text>
    </View>
  );
}
export default Header;