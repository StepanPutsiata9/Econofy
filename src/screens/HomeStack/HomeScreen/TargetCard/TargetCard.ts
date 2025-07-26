import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  targetView: {
    backgroundColor: '#242424',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  completedTargetView: {
    backgroundColor: '#242424',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth:1,
    borderColor:'#5BFF6F',
    shadowColor: '#5BFF6F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  date: {
    fontSize: 14,
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
  },
  savedMoney: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  allMoney: {
    fontSize: 16,
    color: '#B2B2B2',
    fontFamily: 'MontserratBold',
  },
});
