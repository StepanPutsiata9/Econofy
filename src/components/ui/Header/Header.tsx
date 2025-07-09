import { Text, View } from 'react-native';
import {styles} from "./Header"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Coin from "../../SvgComponents/Coin.tsx"
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
      <Text style={styles.headerText}>Ec</Text>
      <Coin/>
      <Text style={styles.headerText}>nofy</Text>
    </View>
  );
}
export default Header;