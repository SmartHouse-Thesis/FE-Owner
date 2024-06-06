import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, message, DatePicker, Popconfirm, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { BreadCrumb } from '../components/BreadCrumb';
import surveyAPI from '../api/request';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '../hook/useDebounce';
import 'dayjs/locale/vi';
import customerAPI from '../api/customer';

const { RangePicker } = DatePicker;

export function SurveyPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useDebounce('', 500);
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [openPopupConfirm, setOpenPopUpConfirm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    id: '',
    customerName: '',
    staffName: '',
    surveyDate: '',
  });

  const { isPending: deviceListLoading, mutate } = useMutation({
    mutationFn: () => surveyAPI.getSurveyListProgress(searchValue),
    onSuccess: (response) => {
      setDevices(response.data);
      setFilteredDevices(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting survey report list',
      });
    },
  });

  const { isPending: customerListLoading, mutate: mutateCustomer } = useMutation({
    mutationFn: (customerId) => customerAPI.getCustomerbyId(customerId),
    onSuccess: (response) => {
      const id = localStorage.setItem('id', response.accountId);
      const fullname = localStorage.setItem('fullname', response.fullName);
      const email = localStorage.setItem('email', response.email);
      const avatar = localStorage.setItem('avatar', response.avatar);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting survey report list',
      });
    },
  });

  useEffect(() => {
    mutate();
  }, [searchValue]);

  const handleCancelPopUpConfirm = () => {
    setOpenPopUpConfirm(false);
  };

  const showPopconfirm = (accountId) => {
    setOpenPopUpConfirm(true);
  };

  const handleOkPopUpConfirm = (contractId) => {
    // Handle confirmation action
  };

  const handleFilterChange = (e, fieldName) => {
    const value = e.target.value.toLowerCase();
    setSearchFilters((prev) => ({ ...prev, [fieldName]: value }));

    const filtered = devices.filter((item) => {
      const id = item.id.toLowerCase();
      const customerName = item.surveyRequest.customer.fullName.toLowerCase();
      const staffName = item.surveyRequest.staff.fullName.toLowerCase();
      const surveyDate = dayjs(item.surveyRequest.surveyDate).format('DD-MM-YYYY').toLowerCase();

      return (
        id.includes(searchFilters.id) &&
        customerName.includes(searchFilters.customerName) &&
        staffName.includes(searchFilters.staffName) &&
        surveyDate.includes(searchFilters.surveyDate)
      );
    });

    setFilteredDevices(filtered);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    const filtered = devices.filter((item) => {
      const surveyDate = dayjs(item.surveyRequest.surveyDate);
      return surveyDate.isBetween(start, end, null, '[]');
    });
    setFilteredDevices(filtered);
  };

  const getColumnSearchProps = (dataIndex, placeholder, nestedDataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90, marginRight: 8 }}>
          Filter
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      const keys = nestedDataIndex.split('.');
      let data = record;
      keys.forEach(key => {
        data = data[key];
      });
      return data ? data.toString().toLowerCase().includes(value.toLowerCase()) : '';
    },
  });

  const columns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span>SR{id.split('-')[0]}</span>,
      ...getColumnSearchProps('id', 'mã hợp đồng', 'id'),
    },
    {
      title: 'Khách hàng',
      dataIndex: ['surveyRequest', 'customer', 'fullName'],
      key: 'customer.fullName',
      render: (fullName, record) => (
        <span>{record.surveyRequest && record.surveyRequest.customer.fullName}</span>
      ),
      ...getColumnSearchProps('customer.fullName', 'khách hàng', 'surveyRequest.customer.fullName'),
    },
    {
      title: 'Nhân viên',
      dataIndex: ['surveyRequest', 'staff', 'fullName'],
      key: 'staff.fullName',
      render: (fullName, record) => (
        <span>{record.surveyRequest && record.surveyRequest.staff.fullName}</span>
      ),
      ...getColumnSearchProps('staff.fullName', 'nhân viên', 'surveyRequest.staff.fullName'),
    },
    {
      title: 'Ngày báo cáo khảo sát',
      dataIndex: ['surveyRequest', 'surveyDate'],
      key: 'surveyRequest.surveyDate',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      filterDropdown: () => (
        <RangePicker onChange={handleDateRangeChange} />
      ),
      filterIcon: () => <Icon icon='material-symbols:date-range' />,
    },
    {
      title: 'Tạo hợp đồng',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Link to={`/survey/create-contract-detail/${id}`}>Tạo hợp đồng</Link>
      ),
    },
    {
      title: 'Chat',
      dataIndex: ['surveyRequest', 'customer', 'accountId'],
      key: 'customer.accountId',
      render: (accountId) => (
        <span className='text-blue-300' onClick={(e) => {
          mutateCustomer(accountId);
          navigate(`/chat/${accountId}`)
        }}>Liên hệ</span>
      ),
    },
    {
      title: 'Xóa khảo sát',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Popconfirm
          title='Xóa khảo sát'
          description='Bạn có muốn xóa khảo sát này không?'
          open={openPopupConfirm}
          onConfirm={() => handleOkPopUpConfirm(id)}
          onCancel={handleCancelPopUpConfirm}
        >
          <Icon
            icon='material-symbols:delete-forever-rounded'
            width='20'
            height='20'
            style={{ color: '#2f8e58', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              showPopconfirm(id);
            }}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <BreadCrumb />
      <div className='px-[24px] pt-[24px]'>
        <Spin tip='Loading...' spinning={deviceListLoading}>
          <div className='bg-[white] pt-[13px] pb-[16px]'>
            <div className='flex items-center justify-between px-[14px] mb-[15px]'>
              <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                Danh sách báo cáo kết quả khảo sát
              </span>
              <Input
                placeholder='Tìm kiếm tên mã'
                onChange={(e) => handleFilterChange(e, 'id')}
                style={{ width: 200 }}
              />
            </div>
            <Table
              columns={columns}
              dataSource={filteredDevices}
              pagination={{ pageSize: 10 }}
              rowKey='id'
            />
          </div>
        </Spin>
      </div>
    </>
  );
}