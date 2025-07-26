import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: '#FF1B44',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical:16,
  },
  errorText:{
    fontSize:18,
    fontFamily:"MontserratBold",
    color:"#fff",
    marginBottom:10,
  },
  bigSummText:{
     fontSize:18,
    fontFamily:"Montserrat",
    color:"#fff",
  }
});
