import { ScrollView, Text, View } from "react-native";
import {styles} from "./CurrencyScreen.ts"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageCoin from "../../../components/SvgComponents/PageCoin.tsx";
import {RootState, useAppDispatch, } from "../../../store/store.ts"
import { useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../../store/slices/Currency.slice.ts";
import { useEffect } from "react";
function Currency() {
    const insets = useSafeAreaInsets();
    const { rates, loading, error, lastUpdated } = useSelector((state: RootState) => state.currency)
    const dispatch=useAppDispatch();
    useEffect(() => {
    dispatch(fetchCurrencyRates('USD'))
  }, [dispatch])
   if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>
  return (
    <View style={[styles.container, {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }]}>
        <View style={styles.titleView}>
            <Text style={styles.title}>Курсы валют</Text>
            <PageCoin/>
        </View>
        <View>
      <Text>Currency Rates (Base: USD)</Text>
      <Text>Last updated: {lastUpdated}</Text>
      <ScrollView>
        {rates && Object.entries(rates).map(([currency, rate]) => (
          <Text key={currency}>
            {currency}: {rate}
          </Text>
        ))}
      </ScrollView>

    </View>
    </View>
  );
}

export default Currency;