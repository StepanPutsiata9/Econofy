import { TouchableOpacity, View } from "react-native";
import { styles } from "./Plus.ts";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlusSvg from "../../SvgComponents/Plus.tsx";


type PlusProps = {
  onPress: () => void;  
};

function Plus({ onPress }: PlusProps) {
  const insets = useSafeAreaInsets();

  return (  
    <View style={[styles.plusContainer, { bottom: insets.bottom + 100 }]}>
      <TouchableOpacity
        style={styles.plus}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={onPress}  
      >
        <PlusSvg />
      </TouchableOpacity>
    </View>
  );
}

export default Plus;