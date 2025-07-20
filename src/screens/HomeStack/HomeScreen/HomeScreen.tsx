import { View, Text, Image } from 'react-native';
import PageCoin from '../../../components/SvgComponents/PageCoin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.ts';
import { RootState } from '../../../store/store.ts';
import { useSelector } from 'react-redux';
import NoUser from '../../../components/SvgComponents/NoUser.tsx';
import NearestTarget from '../HomeScreen/NearestTarget/NearestTarget.tsx';
import TargetCard from '../HomeScreen/TargetCard/TargetCard.tsx';
function Home() {
  const insets = useSafeAreaInsets();
  const { ava, user } = useSelector((state: RootState) => state.auth);

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
        {ava !== 'empty' && ava ? (
          <Image source={{ uri: ava }} style={styles.avatar} />
        ) : (
          <NoUser />
        )}
        <View>
          <Text style={styles.helloText}>Привет, {user?.login}!</Text>
          <Text style={styles.aimCount}>
            У вас <Text style={styles.helloText}>5</Text> целей
          </Text>
        </View>
        <PageCoin />
      </View>

      <View style={styles.cardsView}>
        <NearestTarget
          title="Ближайшая цель"
          date={'12.12.2002'}
          savedMoney={3000.05}
          allMoney={4000.0}
        />

        <TargetCard
          title="Ближайшая цель"
          date={'12.12.2002'}
          savedMoney={3000.05}
          allMoney={4000.0}
        />
         <TargetCard
          title="Ближайшая цель"
          date={'12.12.2002'}
          savedMoney={3000.05}
          allMoney={4000.0}
        />
         <TargetCard
          title="Ближайшая цель"
          date={'12.12.2002'}
          savedMoney={3000.05}
          allMoney={4000.0}
        />
      </View>
    </View>
  );
}
export default Home;
