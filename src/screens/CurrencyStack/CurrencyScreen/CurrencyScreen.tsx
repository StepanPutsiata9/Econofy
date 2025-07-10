import { Text, View } from "react-native";
import {styles} from "./CurrencyScreen.ts"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageCoin from "../../../components/SvgComponents/PageCoin.tsx";
function Currency() {
    const insets = useSafeAreaInsets();
    
  return (
    <View style={[styles.container, {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }]}>
        <View style={styles.titleView}>
            <Text style={styles.title}>Курсы валют</Text>
            <PageCoin/>
        </View>
    </View>
  );
}

export default Currency;