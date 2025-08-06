import React, { useEffect, useCallback, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import { styles } from './CurrencyScreen.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageCoin from '../../../components/SvgComponents/PageCoin.tsx';
import { RootState, useAppDispatch } from '../../../store/store.ts';
import { useSelector } from 'react-redux';
import { fetchCurrencyRates } from '../../../store/slices/Currency.slice.ts';
import CurrencyComp from './CurrencyComp/CurrencyComp.tsx';
import { LoadContainer } from '../../LoadScreen/LoadScreen.tsx';
import ErrorMessage from '../../../components/ui/ErrorMessage/ErrorMessage.tsx';
import { loadMoreCurrency,searchCurrency } from '../../../store/slices/Currency.slice.ts';
function Currency() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const { searchedCurrency, loading, error, lastUpdated, isFull } = useSelector(
    (state: RootState) => state.currency,
  );
  const dispatch = useAppDispatch();

  const refreshData = useCallback(() => {
    dispatch(fetchCurrencyRates('USD'));
  }, [dispatch]);
  const searchData=useCallback((text:string) => {
    setSearch(text);
    dispatch(searchCurrency(text));
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const currencyData = React.useMemo(() => {
    return searchedCurrency
      ? Object.entries(searchedCurrency).map(([currency, rate]) => ({
          currency,
          rate,
        }))
      : [];
  }, [searchedCurrency]);

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
      <Text style={styles.cyrrencyRates}>
        Курс относительно <Text style={styles.green}>USD</Text>
      </Text>
      <Text style={styles.lastUpdate}>
        Актуально на:
        <Text style={styles.green}>
          {' '}
          {lastUpdated?.slice(0, 10) || 'нет информации'}
        </Text>
      </Text>
      <TouchableOpacity onPress={refreshData}>
        <Text style={styles.updateText}>Обновить</Text>
      </TouchableOpacity>
      <View style={styles.searchView}>
        <TextInput
          value={search}
          placeholder="Поиск"
          style={styles.search}
          onChangeText={searchData}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9B9B"
        />
      </View>
      {loading && <LoadContainer />}
      {error && <ErrorMessage/>}
      {!loading && !error && (
        <View
          style={[styles.currencyView, { marginBottom: insets.bottom + 90 }]}
        >
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
            ListFooterComponent={
              <View>
                { !isFull&&
                  <TouchableOpacity
                    style={styles.showMoreView}
                    onPress={() => {
                      dispatch(loadMoreCurrency());
                    }}
                  >
                    <Text style={styles.showMoreText}>Показать еще</Text>
                  </TouchableOpacity>
                }
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}

export default React.memo(Currency);
