import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  nearestTargetView: {
    backgroundColor: '#1C331F',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
   title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  date: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  moneyView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 19,
  },
  savedMoney: {
    fontSize: 30,
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
  },
  allMoney: {
    fontSize: 18,
    color: '#7D7D7D',
    fontFamily: 'MontserratBold',
  },
});
