import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FF1B44',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },
  checkInet: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#fff',
    marginBottom: 5,
  },

  textStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
