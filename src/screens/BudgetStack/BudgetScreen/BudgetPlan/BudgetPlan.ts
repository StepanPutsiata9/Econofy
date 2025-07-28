import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  budgetPlan: {
    backgroundColor: '#242424',
    padding: 16,
    borderRadius: 20,
  },

  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#fff',
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moneyCountView: {
    flexDirection: 'column',
    gap: 5,
  },
  countText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#fff',
  },
  countNumber: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },

  termText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#fff',
  },
  progressView: {
    marginBottom: 12,
  },
  addConsumption: {
    alignSelf: 'flex-end',
  },
  addConsumptionText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: '#5BFF6F',
    textDecorationLine:'underline',
  },
});
