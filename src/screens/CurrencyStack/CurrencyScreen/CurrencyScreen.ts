import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal:16,
    height:"100%",
},
titleView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
},
title:{
    color:'#5BFF6F',
    fontFamily:'MontserratBold',
    fontSize:34,
},
cyrrencyRates:{
    color:'#fff',
    fontSize:20,
    fontFamily:'MontserratBold',
    marginBottom:5,
},
lastUpdate:{
    color:'#fff',
    fontSize:16,
    fontFamily:'Montserrat',
    marginBottom:15,

},
flatList:{
    height:515,
    paddingVertical:10,
},
});