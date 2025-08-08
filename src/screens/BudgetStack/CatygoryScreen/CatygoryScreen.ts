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
    paddingRight:5,
  },
  title: {
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
    fontSize: 34,
  },
  infoView: {
    marginBottom: 10,
  },
  spendView:{
    marginBottom: 16,
  },
  monthText: {
    color: '#fff',
    fontFamily: 'MontserratBold',
    fontSize: 24,
  },
  spendingText:{
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  greenText:{
    color: '#5BFF6F',
  },


  containerView:{
    backgroundColor:'#242424',
    padding:16,
    marginBottom:10,
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  titleAndDate:{
    flexDirection:'row',
  },
  dateText:{
    marginRight:8,
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  titleText:{
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  spendText:{
    color: '#fff',
    fontFamily: 'MontserratBold',
    fontSize: 16,
    
  }
});
