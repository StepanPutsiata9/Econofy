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
    marginBottom: 30,
  },
  title: {
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
    fontSize: 34,
  },
  logoutText:{
    color:'#FF1B44',
    fontSize:16,
    fontFamily:"MontserratBold",
  },
  logoutView:{
    backgroundColor:'#242424',
    height:52,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:16,
    paddingRight:27,
    borderRadius:15,
  }
});
