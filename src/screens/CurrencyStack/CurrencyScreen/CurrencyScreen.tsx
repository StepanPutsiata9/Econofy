import React, { useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { styles } from './CurrencyScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageCoin from '../../../components/SvgComponents/PageCoin.tsx';
import { RootState, useAppDispatch } from '../../../store/store.ts';
import { useSelector } from 'react-redux';
import { fetchCurrencyRates } from '../../../store/slices/Currency.slice.ts';
import CurrencyComp from './CurrencyComp/CurrencyComp.tsx';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';

function Currency() {
  const insets = useSafeAreaInsets();
  const { rates, loading, error, lastUpdated } = useSelector(
    (state: RootState) => state.currency,
  );
  const dispatch = useAppDispatch();

  const refreshData = useCallback(() => {
    dispatch(fetchCurrencyRates('USD'));
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const currencyData = React.useMemo(() => {
    return rates
      ? Object.entries(rates).map(([currency, rate]) => ({
          currency,
          rate,
        }))
      : [];
  }, [rates]);

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
        <Text style={styles.title}>Курсы валют</Text>
        <PageCoin />
      </View>
      {loading&&<LoadContainer/>}
      {error&&<Text style={{color:'#fff',marginTop:100,marginLeft:50}}>Something went wrong...</Text>}
      {!loading && !error && (
        <View>
          <Text style={styles.cyrrencyRates}>Курс относительно USD</Text>
          <Text style={styles.lastUpdate}>Информация на: {lastUpdated}</Text>
          <TouchableOpacity onPress={refreshData}>
            <Text style={{ color: '#fff', marginBottom: 10 }}>Обновить</Text>
          </TouchableOpacity>

          <FlatList
            data={currencyData}
            renderItem={({ item }) => (
              <CurrencyComp
                currency={item.currency}
                rate={item.rate}
                key={item.currency}
              />
            )}
            keyExtractor={item => item.currency}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            style={styles.flatList}
          />
        </View>
      )}
    </View>
  );
}

export default React.memo(Currency);
