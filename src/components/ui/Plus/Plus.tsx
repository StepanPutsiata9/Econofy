import { TouchableOpacity, View } from "react-native";
import {styles} from "./Plus.ts"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlusSvg from "../../SvgComponents/Plus.tsx"
function Plus() {
    const insets = useSafeAreaInsets();

  return (
    <View style={[styles.plusContainer, { bottom: insets.bottom + 100 }]}>
      {/* <LinearGradient
        colors={['#195dfc', '#4C82FF']}
        style={styles.gradientBtn}
      > */}
        <TouchableOpacity
          style={styles.plus}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={()=>{}}
        >
          <PlusSvg />
        </TouchableOpacity>
      {/* </LinearGradient> */}
    </View>
  );
}

export default Plus;