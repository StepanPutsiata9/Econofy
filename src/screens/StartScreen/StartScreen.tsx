import { View, Text, ScrollView } from 'react-native';
import StartBanner from '../../components/SvgComponents/StartBanner.tsx';
import { styles } from './StartScreen';
import MainButton from '../../components/ui/MainButton/MainButton.tsx';
import Header from '../../components/ui/Header/Header.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types.ts';
function Start() {
  const authNavigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.bannerContainer}>
          <StartBanner />
        </View>
        <View style={styles.bannerMainTextContainer}>
          <Text style={styles.bannerMainText}>
            Легкий Способ Контроля Финансов
          </Text>
        </View>
        <View style={styles.bannerSecondaryTextContainer}>
          <Text style={styles.bannerSecondaryText}>
            Твой новый путь к учету финансов без стресса начинается здесь.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <MainButton title="Начать" onClick={() => {authNavigation.navigate('AuthScreen')}} />
      </View>
    </View>
  );
}

export default Start;
