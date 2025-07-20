import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  settingText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  settingView: {
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

  },
});
