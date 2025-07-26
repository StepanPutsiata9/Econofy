import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal:16,
    height:"100%",
  },
  authText:{
    color:'#ffffff',
    fontFamily:'MontserratBold',
    fontSize:34,
    lineHeight:30,
    marginBottom:32,
  },
  loginInput: {
    height: 50,
    borderRadius: 18,
    paddingHorizontal: 17,
    marginBottom: 25,
    fontSize: 16,
    backgroundColor: '#242424',
    fontFamily:'Montserrat',
    color: '#ffffff'
  },
  passwordInput:{
    height: 50,
    borderRadius: 18,
    paddingHorizontal: 17,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#242424',
    fontFamily:'Montserrat',
    color: '#ffffff'
  },
  errorInput:{
    borderColor:'#FF1B44',
    borderWidth:2,
  },
  touchOpacity:{
     alignSelf: 'flex-end',
     marginBottom:25,
  },
  noAccountText:{
    color:'#5BFF6F',
    fontSize:14,
    lineHeight:17,
    textDecorationLine:'underline',
  },
    eye: {
    position: 'absolute',
    right: 17,
    top: 13
  },
  inputView: {
    position: 'relative'
  },
  errorText: {
    color: '#FF1B44',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    paddingVertical: 3,
    fontFamily:'Montserrat'
  },
});