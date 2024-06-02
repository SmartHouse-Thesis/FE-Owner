import React, { useState, useEffect } from 'react';
import { Spin, message, Input, DatePicker, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import packageAPI from '../api/package';
import { formatCurrency } from '../utils/formatCurrentcy';
import { useDebounce } from '../hook/useDebounce';
import { BreadCrumb } from '../components/BreadCrumb';
import { Pagination } from '../components/Pagination';

const { RangePicker } = DatePicker;

export function PackagePage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useDebounce('', 500);
  const [packages, setPackageDevices] = useState({
    data: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const { isPending: deviceListLoading, mutate: mutatePackage } = useMutation({
    mutationFn: () => packageAPI.getPackageDevices(value),
    onSuccess: (response) => {
      setPackageDevices(response);
      setFilteredData(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });

  useEffect(() => {
    mutatePackage();
  }, [value]);

  const handleNameSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = packages.data.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    const filtered = packages.data.filter((item) => {
      const itemStartDate = new Date(item.startDate);
      const itemEndDate = new Date(item.endDate);
      return (
        (!start || itemStartDate >= start) &&
        (!end || itemEndDate <= end)
      );
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Tên gói thiết bị',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Input
          placeholder='Tìm kiếm'
          onChange={handleNameSearch}
        />
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
      render: (text, record) => (
        <Link
          to={`/package-page/update-package/${record.id}`}
          className='gap-[8px] pl-[14px]  flex  items-center '
        >
          <img
            src={record.images[0].url}
            className='w-[24px] h-[24px]'
          />
          {text}
        </Link>
      ),
    },
    {
      title: 'Số ngày hoàn thành',
      dataIndex: 'completionTime',
      key: 'completionTime',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
    },
  ];

  return (
    <>
      <BreadCrumb />
      <div className='px-[24px] pt-[24px]'>
        <Spin tip='Loading...' spinning={deviceListLoading}>
          <div className='bg-[white]  pt-[13px] pb-[16px] '>
          <div className='flex items-center justify-between px-[14px] mb-[15px]'>
              <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                Danh sách gói sản phẩm
              </span>
            </div>

            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 10 }}
              rowKey='id'
            />
          </div>
        </Spin>
      </div>
    </>
  );
}