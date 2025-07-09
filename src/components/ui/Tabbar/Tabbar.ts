import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#2B2B2B',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  tabButtonWrapper: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    height: 52,
    marginVertical: 4,
  },
  activeTabButton: {
    // Стили теперь применяются через анимацию
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 3,
    fontFamily: 'Montserrat',
  },
});
