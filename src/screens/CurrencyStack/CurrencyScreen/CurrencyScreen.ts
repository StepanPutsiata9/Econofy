import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    height: '100%',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
    fontSize: 34,
  },
  cyrrencyRates: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 5,
  },
  updateText: { 
    color: '#fff', 
    marginBottom: 15,
    textDecorationLine:'underline',
    fontSize:14,
    fontFamily: 'Montserrat',
},
  green: {
    color: '#5BFF6F',
  },
  lastUpdate: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginBottom: 10,
  },

  showMoreView: {
    alignSelf: 'center',
  },
  showMoreText: {
    color: '#5BFF6F',
    fontSize: 18,
    fontFamily: 'Montserrat',
    paddingBottom: 25,
  },
  currencyView: {
    flex: 1,
  },

  searchView: {},
  search: {
    height: 50,
    borderRadius: 18,
    paddingHorizontal: 17,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#2B2B2B',
    fontFamily: 'Montserrat',
    color: '#ffffff',
  },
});
