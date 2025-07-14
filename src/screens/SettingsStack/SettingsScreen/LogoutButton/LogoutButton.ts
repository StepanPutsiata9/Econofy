import {  StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  logoutText: {
    color: '#FF1B44',
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  logoutView: {
    backgroundColor: '#242424',
    height: 52,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 27,
    borderRadius: 15,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#3A3A3A',
    alignItems: 'center',

  },
  logoutButton: {
    backgroundColor: '#FF1B44',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MontserratBold',
    fontSize: 14,
  },
   fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2D2D2D',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
});