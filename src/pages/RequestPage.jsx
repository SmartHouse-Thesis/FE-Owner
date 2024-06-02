import { Icon } from '@iconify/react';
import user from '../../public/image/user.png';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  message,
  Table,
  Pagination as AntPagination
} from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import surveyAPI from '../api/request';
import TextArea from 'antd/es/input/TextArea';
import staffAPI from '../api/staff';
import dayjs from 'dayjs';
import { useDebounce } from '../hook/useDebounce';

export function RequetsPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [survey, setSurvey] = useState({
    responses: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useDebounce('', 500);
  const [staff, setStaff] = useState([]);
  const [surveyDetail, setSurveyDetail] = useState();
  const [surveyId, setSurveyId] = useState(0);
  const [surveyDate, setSurveyDate] = useState(new Date());
  const [renderModal, setRenderModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    customer: '',
    address: '',
    phoneNumber: '',
    surveyDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showModal = (surveyId, surveyDate) => {
    const newDate = surveyDate.split('T')[0];
    setSurveyDate(newDate);
    setSurveyId(surveyId);
    setIsModalOpen(true);
    if (newDate) {
      mutateStaff(newDate);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRenderModal(false);
  };

  const showDetailModal = (surveyId) => {
    setSurveyId(surveyId);
    if (surveyId) {
      mutateSurveyId(surveyId);
    }
    setIsDetailOpen(true);
  };

  const handleDetailOk = () => {
    setIsDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsDetailOpen(false);
  };

  const selectDateHandler = (date) => {
    if (date) {
      setRenderModal(true);
    }
  };

  const { isPending: staffLoading, mutate: mutateStaff } = useMutation({
    mutationFn: () => staffAPI.getLeadStaffById(surveyDate),
    onSuccess: (response) => {
      const outputArray = response.map(item => ({
        value: item.accountId,
        label: item.fullName,
      }));
      setStaff(outputArray);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get manufactures list',
      });
    },
  });

  const { isPending: surveyDetailLoading, mutate: mutateSurveyId } =
    useMutation({
      mutationFn: () => surveyAPI.getSurveyById(surveyId),
      onSuccess: (response) => {
        setSurveyDetail(response);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Error occur when get manufactures list',
        });
      },
    });

  const { isPending: addRequestSurveyToUser, mutate: mutaateAddRequestSurvey } =
    useMutation({
      mutationFn: (params) => surveyAPI.updateSurveyRequest(params, surveyId),
      onSuccess: (response) => {
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: 'Thêm nhân viên khảo sát thành công',
        });
      },
      onError: (error) => {
        setIsModalOpen(false);
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      },
    });

  const { isPending: surveyListLoading, mutate } = useMutation({
    mutationFn: () => surveyAPI.getSurveyList(value),
    onSuccess: (response) => {
      setSurvey(response);
      setFilteredData(response.data);
    },
    onError: (response) => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });

  useEffect(() => {
    mutate(value);
  }, [addRequestSurveyToUser, value]);

  const onSubmitCreateSurvey = (response) => {
    mutaateAddRequestSurvey({
      surveyId: surveyId,
      surveyDate: response.surveyDate.format('YYYY-MM-DD'),
      staffId: response.customerId,
      description: response.description,
    });
  };

  const handleFilterChange = (e, fieldName) => {
    const value = e.target.value.toLowerCase();
    setSearchFilters(prev => ({ ...prev, [fieldName]: value }));

    const filtered = survey.data.fpy-ilter(item => {
      const customerName = item.customer.fullName.toLowerCase();
      const customerAddress = item.customer.address.toLowerCase();
      const customerPhone = item.customer.phoneNumber.toLowerCase();
      const surveyDate = dayjs(item.surveyDate).format('DD-MM-YYYY').toLowerCase();

      return (
        customerName.includes(searchFilters.customer) &&
        customerAddress.includes(searchFilters.address) &&
        customerPhone.includes(searchFilters.phoneNumber) &&
        surveyDate.includes(searchFilters.surveyDate)
      );
    });

    setFilteredData(filtered);
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm ${placeholder}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Filter
        </Button>
        <Button
          onClick={() => clearFilters()}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'fullName'],
      key: 'customer',
      ...getColumnSearchProps('customer.fullName', 'khách hàng'),
      render: (text, record) => (
        <div className='flex gap-[8px] justify-start items-center'>
          <img src={user} alt='User Avatar' />
          <div className='flex flex-col'>
            <span className='font-poppin text-[14px] font-medium text-[#495057]'>
              {record.customer.fullName}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['customer', 'address'],
      key: 'address',
      ...getColumnSearchProps('customer.address', 'địa chỉ'),
      render: (text, record) => (
        <div className=''>
          <span className='font-poppin text-[14px] font-medium'>
            {record.customer.address}
          </span>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['customer', 'phoneNumber'],
      key: 'phoneNumber',
      ...getColumnSearchProps('customer.phoneNumber', 'số điện thoại'),
      render: (text, record) => (
        <div className=''>
          <span className='font-poppin text-[14px] font-medium'>
            {record.customer.phoneNumber}
          </span>
        </div>
      ),
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'surveyDate',
      key: 'surveyDate',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            format="DD-MM-YYYY"
            value={selectedKeys[0] ? dayjs(selectedKeys[0], 'DD-MM-YYYY') : null}
            onChange={date => setSelectedKeys(date ? [dayjs(date).format('DD-MM-YYYY')] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Filter
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => dayjs(record.surveyDate).format('DD-MM-YYYY').includes(value),
      render: (text, record) => (
        <div className=''>
          <span className='font-poppin text-[14px] font-medium'>
            {dayjs(record.surveyDate).format('DD-MM-YYYY')}
          </span>
        </div>
      ),
    },
    {
      title: 'Gán nhân viên',
      key: 'assign',
      render: (text, record) => (
        <div className=''>
          <button
            onClick={() => showModal(record.id, record.surveyDate)}
            className='rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#3fc055]'
          >
            Gán nhân viên
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Modal
        open={isDetailOpen}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        cancelText={false}
      >
        <div className='flex items-center justify-between mb-[20px]'>
          <span>Xem yêu cầu</span>
        </div>
        <Spin tip='Loading...' spinning={surveyDetailLoading}>
          <span>Tên khách hàng</span>
          <Input
            disabled
            style={{
              width: '100%',
              marginBottom: '15px',
            }}
            value={surveyDetail?.customer.fullName}
          />
          <span>Địa chỉ</span>
          <Input
            disabled
            style={{
              width: '100%',
              marginBottom: '15px',
            }}
            value={surveyDetail?.customer.address}
          />
          <span>Ngày yêu cầu</span>
          <DatePicker
            disabled
            style={{
              width: '100%',
              marginBottom: '15px',
            }}
            value={dayjs(
              dayjs(surveyDetail?.surveyDate).format('YYYY-MM-DD'),
              'YYYY-MM-DD'
            )}
          />
          <span>Số điện thoại</span>
          <Input
            disabled
            style={{
              width: '100%',
              marginBottom: '15px',
            }}
            value={surveyDetail?.customer.phoneNumber}
          />
          <span>Mô tả</span>
          <Input
            disabled
            style={{
              width: '100%',
              marginBottom: '15px',
            }}
            value={surveyDetail?.description}
          />
        </Spin>
      </Modal>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        cancelText={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className='flex items-center justify-between mb-[20px]'>
          <span>Gán nhân viên</span>
        </div>
        <Form layout='vertical' onFinish={onSubmitCreateSurvey}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item label='Chọn ngày' name='surveyDate'>
                <DatePicker
                  className='w-full'
                  showTime
                  format='YYYY-MM-DD'
                  onChange={selectDateHandler}
                />
              </Form.Item>
              {renderModal ? (
                <>
                  <Form.Item label='Chọn nhân viên' name='customerId'>
                    <Select
                      placeholder='Select staff'
                      style={{
                        width: '100%',
                      }}
                      open={open}
                      onDropdownVisibleChange={(visible) => setOpen(visible)}
                    >
                      {staff?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label='Nội dung' name='description'>
                    <TextArea required placeholder='Nhập nội dung'></TextArea>
                  </Form.Item>
                </>
              ) : (
                ''
              )}
            </Col>

            <Col span={24}>
              <div className='flex justify-end gap-4'>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={addRequestSurveyToUser}
                >
                  Gán nhân viên
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className='px-[24px] pt-[24px]'>
        <Spin tip='Loading...' spinning={surveyListLoading}>
          <div className='bg-[white] pt-[13px] pb-[16px]'>
          <div className='flex items-center justify-between px-[14px] mb-[15px]'>
              <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                Danh sách yêu cầu
              </span>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
              pagination={false}
              rowKey='id'
            />
            <AntPagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={handlePaginationChange}
              showSizeChanger
              onShowSizeChange={(current, size) => setPageSize(size)}
              style={{ textAlign: 'right', marginTop: 20 }}
            />
          </div>
        </Spin>
      </div>
    </>
  );
}