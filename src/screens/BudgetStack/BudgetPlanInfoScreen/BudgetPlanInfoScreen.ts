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
  },
  titleInfoView: {
    marginBottom: 20,
  },
  greenText: {
    color: '#5BFF6F',
  },
  titleInfoText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  title: {
    color: '#5BFF6F',
    fontFamily: 'MontserratBold',
    fontSize: 34,
  },
  distributionView: {
    marginBottom: 20,
  },
  distributionText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  analysisView: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
  },
  analysisText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  recommendationsView: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
  },
  recommendationsText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  btnView: {
    marginBottom: 10,
  },
  goBack: {
    marginBottom: 30,
  },
  goBackBtn: {
    alignSelf: 'center',
  },
  goBackText: {
    color: '#5BFF6F',
    fontFamily: 'Montserrat',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  warningView: {
    marginBottom: 20,
  },
  warningText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  contentView: {
    marginBottom:20,
  },
  contentText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
});
