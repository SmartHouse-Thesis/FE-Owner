import React, { useState, useEffect } from 'react';
import { Spin, message, Input, Table, Popconfirm, Image, Pagination } from 'antd';
import { BreadCrumb } from '../components/BreadCrumb';
import manufactureAPI from '../api/manufacture';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '../hook/useDebounce';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';

export function Manufacture() {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useDebounce('', 500);
  const [manufactures, setManufactures] = useState([]);
  const [filteredManufactures, setFilteredManufactures] = useState([]);
  const [openPopupConfirm, setOpenPopUpConfirm] = useState(false);
  const { isPending: manufactureListLoading, mutate } = useMutation({
    mutationFn: () => manufactureAPI.getManufacture(searchValue),
    onSuccess: (response) => {
      setManufactures(response);
      setFilteredManufactures(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting manufactures list',
      });
    },
  });

  useEffect(() => {
    mutate();
  }, [searchValue]);

  useEffect(() => {
    const originValues = manufactures.map((manufacture) => manufacture.origin);
    // Lọc các giá trị trùng lặp trước khi đặt vào originFilters
    const uniqueOriginValues = [...new Set(originValues)];
    setOriginFilters(uniqueOriginValues);
  }, [manufactures]);

  const handleCancelPopUpConfirm = () => {
    setOpenPopUpConfirm(false);
  };

  const showPopconfirm = (manufactureId) => {
    setOpenPopUpConfirm(true);
  };

  const handleOkPopUpConfirm = (manufactureId) => {
    // Handle confirmation action
  };

  const handleNameSearch = (value) => {
    setSearchValue(value);
  };

  const [originFilters, setOriginFilters] = useState([]);

  const columns = [
    {
      title: 'Tên hãng',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder='Tìm kiếm'
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
      filterIcon: () => <Icon icon='carbon:search' />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} width={30} />,
    },
    {
      title: 'Nguồn gốc',
      dataIndex: 'origin',
      key: 'origin',
      filters: originFilters.map((origin) => ({ text: origin, value: origin })),
      onFilter: (value, record) => record.origin === value,
    },
    {
      title: 'Thông tin',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description.slice(0, 30) + '...',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (createAt) => dayjs(createAt).format('DD-MM-YYYY'),
    },

  ];

  return (
    <>
      <BreadCrumb />
      <div className='px-[24px] pt-[24px]'>
        <Spin tip='Loading...' spinning={manufactureListLoading}>
          <div className='bg-white pt-13 pb-16'>
            <div className='py-[20px] flex items-center justify-between px-14 mb-15'>
              <span className='text-#495057 font-poppin font-medium text-16'>
                Danh sách các hãng sản xuất
              </span>

            </div>
            <Table
              columns={columns}
              dataSource={filteredManufactures}
              pagination={{ pageSize: 10 }}
              rowKey='id'
              scroll={{ x: 'max-content' }}
            />
         
          </div>
        </Spin>
      </div>
    </>
  );
}