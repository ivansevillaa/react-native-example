import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 40,
  },
  separator: {
    borderColor: 'gray',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  bottom: {
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 5,
  },
  title: {
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
  },
  info: {
    maxWidth: '70%',
  },
  counter: {
    alignItems: 'center',
  },
  count: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  countBtn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    width: 40,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 22,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 5,
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
});

export default styles;
