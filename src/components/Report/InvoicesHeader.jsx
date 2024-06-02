import { PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { MyDocument } from '.';

export function InvoicesHeader() {
  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderBottomColor: '#000',
      border: 1,
      alignItems: 'center',
      textAlign: 'center',
      borderStyle: 'solid',
      fontWeight: '700',
      flexGrow: 1,
      fontSize: '9px',
    },
    no: {
      width: '15%',
      borderRightColor: "#000",
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px'
    },
    content: {
      width: '20%',
      borderRightColor: "#000",
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px'
    },
    type: {
      width: '10%',
      borderRightColor: "#000",
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px'
    },
    quantity: {
      width: '10%',
      borderRightColor: "#000",
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px'
    },
    price: {
      width: '20%',
      borderRightColor: "#000",
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px'
    },
    total: {
      width: '20%',
      borderRightColor: "#000",
      height: '100%',
      padding: '6px 0px'
    },
  });
  return (
    <View style={styles.row}>
      <Text style={styles.no}>STT</Text>
      <Text style={styles.content}>Nội dung</Text>
      <Text style={styles.type}>Đơn vị</Text>
      <Text style={styles.quantity}>Số lượng</Text>
      <Text style={styles.price}>Đơn giá</Text>
      <Text style={styles.total}>Thành tiền</Text>
    </View>
  );
}
