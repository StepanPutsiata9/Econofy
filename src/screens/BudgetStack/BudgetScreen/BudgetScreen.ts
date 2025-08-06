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
  budgetsView:{
    // paddingBottom:100,

  },
  emptyView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  emptyText:{
    fontSize:30,
    textAlign:'center',
    color: '#5BFF6F',
    fontFamily: 'Montserrat',
  }
});
