import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    margin: 25,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    height: 70,
    width: 80,
    marginRight: 10,
  },
  status: {
    fontWeight: '700',
    color: 'gray',
  },
  date: {
    flexDirection: 'row',
    color: 'gray',
    marginVertical: 5,
  },
  dateContent: {
    color: 'gray',
    fontSize: 13,
    marginRight: 5,
  },
  info: {
    flexDirection: 'row',
  },
  infoContent: {
    fontSize: 14,
    marginRight: 5,
  },
});

export default styles;
