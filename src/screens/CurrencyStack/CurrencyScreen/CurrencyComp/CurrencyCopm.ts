import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor:'#242424',
    borderRadius:20,
    marginBottom:16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:70
  },
  infoView:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:22,
  },

  currency:{
    color:"#5BFF6F",
    marginLeft:20,
    fontSize:20,
    fontFamily:"Montserrat",

  },
  rate:{
    color:"#5BFF6F",
    fontSize:20,
    marginRight:22,
    fontFamily:"MontserratBold",

  }
});
