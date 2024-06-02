import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, message, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import { BreadCrumb } from '../components/BreadCrumb';
import promotionAPI from '../api/promotion';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '../hook/useDebounce';
import 'dayjs/locale/vi';

const { RangePicker } = DatePicker;

export function PromotionPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useDebounce('', 500);
  const [promotion, setPromotion] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [discountSearch, setDiscountSearch] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const { isPending: contractLoading, mutate: mutatePromotion } = useMutation({
    mutationFn: () => promotionAPI.getPromotion(searchValue),
    onSuccess: (response) => {
      setPromotion(response.data);
      setFilteredData(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get promotions list',
      });
    },
  });

  useEffect(() => {
    mutatePromotion();
  }, [searchValue]);

  const handleNameSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = promotion.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDiscountSearch = (e) => {
    const value = e.target.value;
    const filtered = promotion.filter((item) =>
      item.discountAmount.toString().includes(value)
    );
    setDiscountSearch(value);
    setFilteredData(filtered);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    const filtered = promotion.filter((item) => {
      const itemStartDate = dayjs(item.startDate);
      const itemEndDate = dayjs(item.endDate);
      return (
        (!start || itemStartDate.isAfter(start) || itemStartDate.isSame(start)) &&
        (!end || itemEndDate.isBefore(end) || itemEndDate.isSame(end))
      );
    });
    setDateRange(dates);
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Tên mã',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Input
          placeholder='Tìm kiếm tên mã'
          onChange={handleNameSearch}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
    },
    {
      title: 'Phần trăm giảm',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      filterDropdown: () => (
        <Input
          placeholder='Tìm kiếm phần trăm giảm'
          value={discountSearch}
          onChange={handleDiscountSearch}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: () => <Icon icon='material-symbols:search' />,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      filterDropdown: () => (
        <RangePicker
          onChange={handleDateRangeChange}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: () => <Icon icon='material-symbols:date-range' />,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      filterDropdown: () => (
        <RangePicker
          onChange={handleDateRangeChange}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: () => <Icon icon='material-symbols:date-range' />,
    },
  ];

  return (
    <>
      <BreadCrumb />
      <div className='px-[24px] pt-[20px]'>
        {contextHolder}
        <Spin tip='Loading...' spinning={contractLoading}>
          <div className='bg-[white] pt-[13px] pb-[16px]'>
            <div className='flex items-center justify-between px-[14px] mb-[15px]'>
              <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                Danh sách mã khuyến mãi
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
