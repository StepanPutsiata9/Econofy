import { View } from 'react-native';
import { styles } from './LoadScreen.ts';
import Header from '../../components/ui/Header/Header.tsx';
import LogoPig from "../../components/SvgComponents/LoadPig.tsx"
function Load() {
  return (
    <View style={styles.container}>
      <Header />
    <View>
        <View>
            <LogoPig/>
        </View>
    </View>
    </View>
  );
}

export default Load;
