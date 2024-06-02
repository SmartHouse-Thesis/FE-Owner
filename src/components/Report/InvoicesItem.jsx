import { PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { MyDocument } from '.';
import { useState } from 'react';

export function InvoicesItem(props) {
  const [newArr, setNewArr] = useState([]);


  const filterItem = () => {
    const newArr = [];
    
    if (props.item) {
      const filteredData = props.item.contractDetails.filter(item => item.type === 'PURCHASE');
      console.log(filteredData);
      props?.item.devicePackageUsages.map((item, index) => {
        // Create a new object with the desired properties
        newArr.push({
          name: item.name,
          type: 'Gói / Chiếc', // Set type as 'Chiếc'
          quantity: 1,
          price: item.price, // Keep price from original object
          total: item.price - item.discountAmount * 0.01,
        });
      });
      filteredData.map((item, index) => {
        // Create a new object with the desired properties
        newArr.push({
          name: item.name,
          type: 'Gói / Chiếc', // Set type as 'Chiếc'
          quantity: item.quantity,
          price: item.price, // Keep price from original object
          total: item.price * item.quantity,
        });
      });
    }
    console.log(newArr);
    
   return newArr;
  };
  // console.log(newArr);
  // filterItem();

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
      fontWeight: '400',
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
      {filterItem().map((item) => (
        <View style={styles.row}>
          <Text style={styles.no}>1</Text>
          <Text style={styles.content}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.total}>{item.total}</Text>
        </View>
      ))}
              <View style={styles.row}>
          <Text style={styles.no}>Tổng</Text>
          <Text style={styles.content}></Text>
          <Text style={styles.type}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.price}></Text>
          <Text style={styles.total}>{props?.item?.totalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.no}>VAT</Text>
          <Text style={styles.content}></Text>
          <Text style={styles.type}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.price}></Text>
          <Text style={styles.total}></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.no}>Tổng cộng</Text>
          <Text style={styles.content}></Text>
          <Text style={styles.type}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.price}></Text>
          <Text style={styles.total}>{props?.item?.totalAmount}</Text>
        </View>
    </>
  );
}
