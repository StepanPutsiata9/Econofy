import { View, Text } from 'react-native';
import Loader from '../../components/ui/Loader/Loader.tsx';
import { styles } from './LoadScreen.ts';
import Header from '../../components/ui/Header/Header.tsx';
import LogoPig from '../../components/SvgComponents/LoadPig.tsx';

export function LoadContainer(){
  return(
      <View style={styles.loadContainer}>
        <View style={styles.logoView}>
          <LogoPig />
        </View>
        <View style={styles.loader}>
          <Loader />
        </View>
        <Text style={styles.loadText}>Загрузка</Text>
      </View>
  )
}
function Load() {
  return (
    <View style={styles.container}>
      <Header />
      <LoadContainer/>
    </View>
  );
}

export default Load;
