import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontWeight: '700',
  },
  separator: {
    borderColor: 'gray',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  plate: {
    flex: 2,
    marginLeft: 10,
  },
  summaryContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  infoCardContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  total: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '700',
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receipt: {
    marginLeft: 5,
    fontWeight: '700',
    fontSize: 14,
  },
  receiptLink: {
    marginTop: 5,
    textDecorationLine: 'underline',
    color: '#3366FF',
    fontSize: 14,
  },
  receiptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nickname: {
    fontWeight: '700',
    marginBottom: 5,
  },
});

export default styles;
