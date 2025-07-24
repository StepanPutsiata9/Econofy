import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5BFF6F',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 30,
  },
  input: {
    width: 150,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#5BFF6F',
    marginHorizontal: 10,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  currency: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    fontFamily: 'Montserrat',
  },
});