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
    marginBottom: 20,
  },
  title: {
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
    fontSize: 34,
  },
  infoView: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  goalNameText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 10,
  },

  input: {
    height: 50,
    borderRadius: 18,
    paddingHorizontal: 17,
    fontSize: 16,
    backgroundColor: '#242424',
    fontFamily: 'Montserrat',
    color: '#ffffff',
  },

  dateView: {
    flexDirection: 'column',
    position: 'relative',
    marginBottom: 50,
  },
  calendar: {
    position: 'absolute',
    right: 17,
    top:53,
  },
});
