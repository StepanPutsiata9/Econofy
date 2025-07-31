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
  categoryView: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems:'center',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#fff',
    marginRight:10,
  },
  categoryCurrent: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#5BFF6F',
  },
  currentCategoryView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    width: 220,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#5BFF6F',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#5BFF6F',
  },
  hiddenIcon: {
    width: 0,
    height: 0,
  },
  dropdownContainer: {
    marginTop:-45,
    width:200,
    backgroundColor: '#2D2D2D',
    borderColor:'#5BFF6F',
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTextStyle: {
    fontSize: 16,
    color:'#fff',
    fontFamily: 'Montserrat',
    borderBottomWidth:1,
    paddingVertical:2,
    borderBottomColor:'#5BFF6F',
  },
  
});
