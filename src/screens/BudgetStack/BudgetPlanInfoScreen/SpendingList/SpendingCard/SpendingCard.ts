import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardView: {
    padding: 16,
    backgroundColor: '#242424',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:10,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleView: {
    marginLeft: 16,
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },

  spendingCountText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  spendingMoneyText: {
    color: '#5BFF6F',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
