import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

  infoText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  addView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight:11,
  },
  minusView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    paddingRight:11,
  },

  delView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  delText: {
    color: '#FF1B44',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
});
