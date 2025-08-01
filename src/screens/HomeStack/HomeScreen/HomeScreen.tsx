import { View, Text, Image, FlatList } from 'react-native';
import PageCoin from '../../../components/SvgComponents/PageCoin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.ts';
import { RootState, useAppDispatch } from '../../../store/store.ts';
import { useSelector } from 'react-redux';
import NoUser from '../../../components/SvgComponents/NoUser.tsx';
import NearestTarget from '../HomeScreen/NearestTarget/NearestTarget.tsx';
import TargetCard from '../HomeScreen/TargetCard/TargetCard.tsx';
import Plus from '../../../components/ui/Plus/Plus.tsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage.tsx';
import { fetchAllGoals, Target } from '../../../store/slices/Home.slice.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../types/navigation.types.ts';
import BackendError from '../../../components/ui/BackendErrorModal/BackendError.tsx';
function Home() {
  const insets = useSafeAreaInsets();
  const { ava, user } = useSelector((state: RootState) => state.auth);
  const { error, loading, data } = useSelector(
    (state: RootState) => state.home,
  );
  const dispatch = useAppDispatch();
  const homeNavigate =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const refreshData = useCallback(() => {
    dispatch(fetchAllGoals());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const sortedData = useMemo(() => {
    const sortDataByDate = (targets: Target[]): Target[] | null => {
      return [...targets].sort((a, b) => {
        const parseDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split('.').map(Number);
          return new Date(year, month - 1, day);
        };
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    };
    return sortDataByDate(data || []);
  }, [data]);

  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  useEffect(() => {
    if (error) {
      setErrorModalVisible(true);
    }
    else{
      setErrorModalVisible(false);
    }
  }, [error]);

  return (
    <>
      <BackendError
        errorModalVisible={errorModalVisible}
        setErrorModalVisible={setErrorModalVisible}
        onPress={()=>dispatch(fetchAllGoals())}
      />
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
              У вас{' '}
              <Text style={styles.helloText}>{sortedData?.length || 0}</Text>{' '}
              цел(и/ей)
            </Text>
          </View>
          <PageCoin />
        </View>
        {loading && <LoadContainer />}
        {error && <ErrorMessage />}
        {!loading && !error && (
          <FlatList
            style={[styles.cardsView, { marginBottom: insets.bottom + 75 }]}
            data={sortedData}
            renderItem={({ item, index }) =>
              index === 0 ? (
                <NearestTarget item={item} />
              ) : (
                <TargetCard item={item} />
              )
            }
            keyExtractor={item => item.id}
          />
        )}

        <Plus onPress={() => homeNavigate.navigate('AddGoalScreen')} />
      </View>
    </>
  );
}
export default React.memo(Home);
