import { PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { MyDocument } from '.';

export function InvoicesFooter(props) {
  const footer = [
    {
      name: 'Tổng',
      price: '.........',
    },
    {
      name: 'VAT(...%)',
      price: '.........',
    },
    {
      name: 'Tổng cộng',
      price: '.........',
    },
  ];

  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderBottomColor: '#000',
      border: 1,
      borderTop: 0,
      alignItems: 'center',
      textAlign: 'center',
      borderStyle: 'solid',
      fontWeight: '700',
      flexGrow: 1,
      fontSize: '9px',
    },
    no: {
      width: '15%',
      borderRightColor: '#000',
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px',
    },
    content: {
      width: '20%',
      borderRightColor: '#000',
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 5px',
    },
    type: {
      width: '10%',
      borderRightColor: '#000',
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px',
    },
    quantity: {
      width: '10%',
      borderRightColor: '#000',
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px',
    },
    price: {
      width: '20%',
      borderRightColor: '#000',
      borderRightWidth: 1,
      height: '100%',
      padding: '6px 0px',
    },
    total: {
      width: '15%',
      borderRightColor: '#000',
      height: '100%',
      padding: '6px 0px',
    },
  });
  return (
    <>
  
    </>
  );
}
