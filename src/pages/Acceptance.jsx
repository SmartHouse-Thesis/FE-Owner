import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { InvoicesHeader } from '../components/Report/InvoicesHeader';
import { InvoicesItem } from '../components/Report/InvoicesItem';
import { InvoicesFooter } from '../components/Report/InvoicesFooter';

export function Acceptance() {
  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAw.ttf',
        fontWeight: 300,
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
        fontWeight: 400,
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf',
        fontWeight: 700,
      },
    ],
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontFamily: 'Roboto',
      padding: '60px 50px',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    sectionTop: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    signature: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 70px',
    },
    textCommunist: {
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    textUnderline: {
      fontSize: '10px',
      fontWeight: '700',
      textDecoration: 'underline',
      marginTop: '4px',
    },
    textContract: {
      fontSize: '10px',
      fontWeight: '700',
      marginTop: '20px',
      textTransform: 'uppercase',
    },
    textItalic: {
      fontSize: '8px',
      fontWeight: '400',
      marginTop: '4px',
      marginBottom: '6px',
    },
    textBold: {
      fontSize: '9px',
      fontWeight: '700',
      marginBottom: '10px',
    },
    textRegular: {
      fontSize: '8px',
      fontWeight: '400',
      marginBottom: '10px',
    },
    textItalicBold: {
      fontSize: '8px',
      fontWeight: '400',
      marginBottom: '10px',
    },
    table: {
      marginBottom: '10px',
    },
    pdf: {
      width: '100vw',
      height: '100vh',
    },
  });
  return (
    <div>
      <PDFViewer style={styles.pdf} className='app'>
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.sectionTop}>
              <Text style={styles.textCommunist}>
                {' '}
                Cộng hòa xã hội chủ nghĩa Việt Nam
              </Text>
              <Text style={styles.textUnderline}>
                {' '}
                Độc lập - Tự do - Hạnh phúc
              </Text>
              <Text style={styles.textContract}>
                {' '}
                BIÊN BẢN NGHIỆM THU LẮP ĐẶT THIẾT BỊ
              </Text>
              <Text style={styles.textItalic}> Số: ........</Text>
            </View>
            <View>
              <Text style={styles.textRegular}>
                Công trình:
                ………………………………………………………………….………………………………………………………….……………………………………
              </Text>
              <Text style={styles.textRegular}>
                Hạng mục:
                ………………………………………………………………….………………………………………………………….……………………………………
              </Text>
              <Text style={styles.textBold}>
                1. Thiết bị (hoặc Gói thiết bị) được nghiệm thu:
                …………………………………………………………………………………………………….
              </Text>
              <Text style={styles.textItalic}>
                (Ghi rõ tên thiết bị được nghiệm thu)
              </Text>
              <Text style={styles.textBold}>
                2. Thành phần trực tiếp nghiệm thu:
                …………………………………………………………………………………………………….
              </Text>
              <Text style={styles.textRegular}>
                - Ông/Bà:
                ......................................................…………………………….………………………………………………………….………………………
              </Text>
              <Text style={styles.textRegular}>
                o Đại diện Nhà thầu thi công:
                …………………………………………………………..………………………………………………………….……………………
              </Text>
              <Text style={styles.textRegular}>
                - Ông: .....................................................
                Chức vụ:…………………….………………………………………………………….…
              </Text>
              <Text style={styles.textBold}>3. Thời gian nghiệm thu:</Text>
              <Text style={styles.textRegular}>
                Bắt đầu: ..............giờ......ngày.......tháng......năm......
              </Text>
              <Text style={styles.textRegular}>
                Kết thúc: .............giờ......ngày........tháng......năm......
              </Text>
              <Text style={styles.textRegular}>
                Tại công trình:
                ………………………………………………………………….………………………………………………………………….
              </Text>
              <Text style={styles.textBold}>
                4. Đánh giá công tác lắp đặt thiết bị:
              </Text>
              <Text style={styles.textRegular}>a. Về căn cứ nghiệm thu:</Text>
              <Text style={styles.textRegular}>
                - Hợp đồng xây dựng số …………… Giữa công ty Phát Đạt và
                Ông/Bà…………….. về việc thi công lắp đặt thiết bị …………………….
              </Text>
              <Text style={styles.textRegular}>
                b. Về chất lượng chế tạo, lắp đặt:
              </Text>
              <Text style={styles.textRegular}>
                (Ghi rõ chất lượng công tác lắp đặt có đạt hạy không đạt theo
                yêu cầu các tiêu chuẩn, qui phạm áp dụng)
              </Text>
              <Text style={styles.textRegular}>
                c. Các ý kiến khác (nếu có):
              </Text>
              <Text style={styles.textBold}>5. Kết luận:</Text>
              <Text style={styles.textRegular}>
                (Cần ghi chấp nhận hay không chấp nhận nghiệm thu. Hoặc ghi rõ
                những sai sót (nếu có) cần phải sửa chữa, hoàn thiện trước).
              </Text>
            </View>
            <View style={styles.signature}>
              <View>
                <Text style={styles.textContract}>
                  CÁN BỘ GIÁM SÁT THI CÔNG
                </Text>
              </View>
              <View>
                <Text style={styles.textContract}>
                  KỸ THUẬT THI CÔNG TRỰC TIẾP
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
