import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, message, DatePicker, Popconfirm } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

  const handleNameSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = devices.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredDevices(filtered);
  };

  const handleDateRangeChange = (dates) => {
    // Handle date range change
  };

  const columns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span>SR{id.split('-')[0]}</span>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Tìm kiếm mã hợp đồng'
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleNameSearch(e, 'id')}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <div style={{ textAlign: 'right' }}>
            <button
              type='button'
              onClick={() => clearFilters()}
              style={{ marginRight: 8 }}
            >
              Reset
            </button>
            <button
              type='button'
              onClick={() => confirm()}
              style={{ marginRight: 8 }}
            >
              OK
            </button>
          </div>
        </div>
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
    },
    {
      title: 'Khách hàng',
      dataIndex: ['surveyRequest', 'customer', 'fullName'],
      key: 'customer.fullName',
      render: (fullName, record) => (
        <span>{record.surveyRequest && record.surveyRequest.customer.fullName}</span>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Tìm kiếm khách hàng'
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleNameSearch(e, ['surveyRequest', 'customer', 'fullName'])}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <div style={{ textAlign: 'right' }}>
            <button
              type='button'
              onClick={() => clearFilters()}
              style={{ marginRight: 8 }}
            >
              Reset
            </button>
            <button
              type='button'
              onClick={() => confirm()}
              style={{ marginRight: 8 }}
            >
              OK
            </button>
          </div>
        </div>
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
    },
    {
      title: 'Nhân viên',
      dataIndex: ['surveyRequest', 'staff', 'fullName'],
      key: 'staff.fullName',
      render: (fullName, record) => (
        <span>{record.surveyRequest && record.surveyRequest.staff.fullName}</span>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Tìm kiếm nhân viên'
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleNameSearch(e, ['surveyRequest', 'staff', 'fullName'])}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <div style={{ textAlign: 'right' }}>
            <button
              type='button'
              onClick={() => clearFilters()}
              style={{ marginRight: 8 }}
            >
              Reset
            </button>
            <button
              type='button'
              onClick={() => confirm()}
              style={{ marginRight: 8 }}
            >
              OK
            </button>
          </div>
        </div>
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
    },
    {
      title: 'Ngày báo cáo khảo sát',
      dataIndex: ['surveyRequest', 'surveyDate'], // Update dataIndex
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
      dataIndex: ['surveyRequest', 'customer', 'accountId'], // Update dataIndex
      key: 'customer.accountId',
      render: (accountId) => (
        <span className='text-blue-300' onClick={(e) => {
          mutateCustomer(accountId);
          navigate(`/chat/${accountId}`)
        
        }} >Liên hệ</span>
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
                onChange={handleNameSearch}
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