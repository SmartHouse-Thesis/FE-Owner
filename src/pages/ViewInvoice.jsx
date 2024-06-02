import {
    Document,
    Font,
    PDFDownloadLink,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View,
  } from '@react-pdf/renderer';
  import { InvoicesHeader } from '../components/Report/InvoicesHeader';
  import { InvoicesItem } from '../components/Report/InvoicesItem';
  import { InvoicesFooter } from '../components/Report/InvoicesFooter';
  import { useParams } from 'react-router';
  import { useMutation } from '@tanstack/react-query';
  import contractAPI from '../api/contract';
  import { useEffect, useState } from 'react';
  import { message } from 'antd';
  
  export function ViewInVoices() {
    const [contract, setContract] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [allContract, setAllContract] = useState([]);
    const { id } = useParams();
    const { isPending: contractLoading, mutate } = useMutation({
      mutationFn: () => contractAPI.getNewContractById(id),
      onSuccess: (response) => {
        console.log(response);
        setContract(response);
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      },
    });
    useEffect(() => {
      mutate();
    }, []);
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
        <PDFDownloadLink
          document={
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
                    Hợp đồng lắp đặt thiết bị thông minh
                  </Text>
                  <Text style={styles.textItalic}> Số: ........</Text>
                </View>
                <View>
                  <Text style={styles.textItalic}>
                    - Căn cứ bộ Luật Thương mại của Quốc hội nước cộng hòa xã hội
                    chủ nghĩa Việt Nam số: 36/2005/QH11 ngày 16/06/2005.
                  </Text>
                  <Text style={styles.textItalic}>
                    - Căn cứ Căn cứ Bộ Luật Dân sự số 91/2015/QH13 được Quốc hội
                    nước CHXHCN Việt Nam thông qua ngày 24/11/2015;
                  </Text>
                  <Text style={styles.textItalic}>
                    - Căn cứ vào nhu cầu và khả năng của hai bên.
                  </Text>
                  <Text style={styles.textItalic}>
                    Hôm nay, ngày … tháng …năm 20…..tại……………………. Chúng tôi gồm các
                    bên dưới đây:
                  </Text>
                  <Text style={styles.textBold}>
                    Bên A(Bên giao khoán): Ông/Bà
                    …………………………………………………………………………………………………….
                  </Text>
                  <Text style={styles.textRegular}>
                    Số CCCD:
                    ………………………………………………………………….………………………………………………………….……………………………………
                  </Text>
                  <Text style={styles.textRegular}>
                    Địa chỉ:
                    ………………………………………………………………….………………………………………………………….……………………………………
                  </Text>
                  <Text style={styles.textRegular}>
                    Số điện thoại:
                    ………………………………………………………………..………………………………………………………….……………………
                  </Text>
                  <Text style={styles.textRegular}>
                    Email:
                    ………………………….…………………………………………….………………………………………………………….…………………………………
                  </Text>
                  <Text style={styles.textBold}>
                    BÊN B (Bên nhận khoán): CÔNG TY
                    ………………………………………….………………………………………………………….
                  </Text>
                  <Text style={styles.textRegular}>
                    Đại diện: …………………………………Chức vụ:
                    …………………………………………………………………………………………………………
                  </Text>
                  <Text style={styles.textRegular}>
                    Mã số thuế:
                    ………………………………………………………………..………………………………………………………………..
                  </Text>
                  <Text style={styles.textRegular}>
                    Địa chỉ: ………………………………………………………………….………………………………………………………………….
                  </Text>
                  <Text style={styles.textItalicBold}>
                    Sau khi bàn bạc, trao đổi hai bên cùng nhau thống nhất ký hợp
                    đồng sản xuất với các điều khoản sau:
                  </Text>
                  <Text style={styles.textBold}>
                    Điều 1: Nội dung của hợp đồng:
                  </Text>
                  <Text style={styles.textRegular}>
                    Bên B nhận lắp đặt thiết bị theo quy cách và số lượng cụ thể
                    như sau:
                  </Text>
                  <View style={styles.table}>
                    <InvoicesHeader />
                    <InvoicesItem item={contract} />
                    <InvoicesFooter item={contract} />
                  </View>
                  <Text style={styles.textRegular}>
                    Bằng chữ:………………………………………………………..đồng
                  </Text>
                  <Text style={styles.textBold}>Điều 2:Thời gian, địa điểm:</Text>
                  <Text style={styles.textRegular}>
                    - Bên B bàn giao và lắp đặt tại công trình …………………………
                  </Text>
                  <Text style={styles.textRegular}>
                    - Thời gian hoàn thành: …./…./……
                  </Text>
                  <Text style={styles.textBold}>
                    Điều 3: Tiêu chuẩn, chất lượng:
                  </Text>
                  <Text style={styles.textRegular}>
                    Được kỹ thuật hoặc cán bộ giám sát của công trình xác nhận về
                    khối lượng và chất lượng của từng hạng mục đã thi công.
                  </Text>
                  <Text style={styles.textBold}>
                    Điều 4: Giá hợp đồng và Phương thức thanh toán
                  </Text>
                  <Text style={styles.textRegular}>
                    - Giá trị hợp đồng là: ……………………….đ ( ………………………….. đồng
                    chẵn./.)
                  </Text>
                  <Text style={styles.textBold}>
                    Điều 5: Trách nhiệm của mỗi bên:
                  </Text>
                  <Text style={styles.textRegular}>1.Trách nhiệm của bên A</Text>
                  <Text style={styles.textRegular}>
                    - Bàn giao cho nhà thầu thi công và giám sát thi công.
                  </Text>
                  <Text style={styles.textRegular}>
                    - Thanh toán đầy đủ số tiền đã ký hợp đồng khi nhà thầu bàn
                    giao cho bên A
                  </Text>
                  <Text style={styles.textRegular}>2.Trách nhiệm của bên B</Text>
                  <Text style={styles.textRegular}>
                    - Hoàn thành và bàn giao đúng tiến độ.
                  </Text>
                  <Text style={styles.textRegular}>
                    - Giữ vệ sinh và bảo đảm an toàn thi công.
                  </Text>
  
                  <Text style={styles.textBold}>Điều 6: Điều khoản chung:</Text>
                  <Text style={styles.textRegular}>
                    - Hai bên cam kết thực hiện đúng như Hợp đồng đã ký. Trong
                    thời gian thực hiện hợp đồng, trong quá trình thực hiện nếu có
                    những vướng mắc hai bên sẽ gặp nhau cùng nhau bàn bạc giải
                    quyết như cơ sở thương lượng.
                  </Text>
                  <Text style={styles.textRegular}>
                    - Hợp đồng có giá trị kể từ ngày ký
                  </Text>
                  <Text style={styles.textRegular}>
                    - Hợp đồng gồm … trang và được lập thành 02 bản, mỗi bên giữ
                    01 bản có giá trị như nhau
                  </Text>
                </View>
                <View style={styles.signature}>
                  <Text style={styles.textContract}>ĐẠI DIỆN BÊN A</Text>
                  <Text style={styles.textContract}>ĐẠI DIỆN BÊN B</Text>
                </View>
              </Page>
            </Document>
          }
          fileName='contract.pdf'
        >
          {({ blob, url, loading, error }) =>
            loading ? <span>Loading...</span> : <span className='bg-lime-400 px-[10px] py-[8px]'>Tải hợp đồng</span>
          }
        </PDFDownloadLink>
      </div>
    );
  }
  