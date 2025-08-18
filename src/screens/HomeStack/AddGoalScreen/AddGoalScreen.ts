import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    height: '100%',
  },
  avoidView: {
    backgroundColor: '#121212',
    flexGrow: 1,
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
  errorInput: {
    borderWidth: 2,
    borderColor: '#FF1B44',
    borderRadius: 18,
  },

  dateView: {
    flexDirection: 'column',
    position: 'relative',
    marginBottom: 50,
  },
  calendar: {
    position: 'absolute',
    right: 17,
    top: 53,
  },

  errorText: {
    color: '#FF1B44',
    fontSize: 14,
    textAlign: 'left',
    paddingVertical: 3,
    fontFamily: 'Montserrat',
  },
});
