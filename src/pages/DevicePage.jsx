import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import devicesAPI from '../api/device';
import { useMutation } from '@tanstack/react-query';
import { formatCurrency } from '../utils/formatCurrentcy';
import { BreadCrumb } from '../components/BreadCrumb';
import { useDebounce } from '../hook/useDebounce';

export function DevicePage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useDebounce('', 500);
  const [devices, setDevices] = useState([]);
  const { isPending: deviceListLoading, mutate: mutateSmartDevice } = useMutation({
    mutationFn: () => devicesAPI.getSmartDevice(searchValue),
    onSuccess: (response) => {
      setDevices(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when getting products list',
      });
    },
  });

  useEffect(() => {
    mutateSmartDevice();
  }, [searchValue]);

  const getUniqueValues = (data, key) => {
    const values = data.map(item => key === 'manufacturer' ? item[key].name : item[key]);
    return [...new Set(values)];
  };

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className='flex items-center gap-2'>
          <img src={record.images[0].url} className='w-6 h-6' alt={text} />
          <Link
            to={`/device-page/update-device/${record.id}`}
            className='hover:text-blue-300 font-poppin text-[14px] font-medium text-[#495057]'
          >
            {text}
          </Link>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm kiếm tên"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <button onClick={confirm} type="button">Filter</button>
          <button onClick={clearFilters} type="button">Reset</button>
        </div>
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Hãng',
      dataIndex: ['manufacturer', 'name'],
      key: 'manufacturer',
      filters: getUniqueValues(devices, 'manufacturer').map(value => ({ text: value, value })),
      onFilter: (value, record) => record.manufacturer.name === value,
    },
    {
      title: 'Loại thiết bị',
      dataIndex: 'deviceType',
      key: 'deviceType',
      filters: getUniqueValues(devices, 'deviceType').map(value => ({ text: value, value })),
      onFilter: (value, record) => record.deviceType === value,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
      filters: getUniqueValues(devices, 'price').map(value => ({ text: formatCurrency(value), value })),
      onFilter: (value, record) => record.price.toString() === value,
    },
    {
      title: 'Giá lắp đặt',
      dataIndex: 'installationPrice',
      key: 'installationPrice',
      render: (price) => formatCurrency(price),
      filters: getUniqueValues(devices, 'installationPrice').map(value => ({ text: formatCurrency(value), value })),
      onFilter: (value, record) => record.installationPrice.toString() === value,
    },
  ];

  return (
    <>
      <BreadCrumb />
      <div className='px-[24px] pt-[24px]'>
        {contextHolder}
        <Spin tip='Loading...' spinning={deviceListLoading}>
          <div className='bg-[white] pt-[13px] pb-[16px]'>
          <div className='flex items-center justify-between px-[14px] mb-[15px]'>
              <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                Danh sách thiết bị
              </span>
            </div>
            <Table
              columns={columns}
              dataSource={devices}
              pagination={{ pageSize: 10 }}
              rowKey='id'
            />
          </div>
        </Spin>
      </div>
    </>
  );
}