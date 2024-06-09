import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Spin, message, Table, Input, Button, DatePicker, Modal, Pagination as AntPagination } from 'antd';
import { useMutation } from '@tanstack/react-query';
import contractAPI from '../api/contract';
import { Link } from 'react-router-dom';
import { truncateText } from '../utils/truncate';
import dayjs from 'dayjs';

export function DoneConstruction() {
  const [messageApi, contextHolder] = message.useMessage();
  const [contracts, setContracts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [contractId, setContractId] = useState();

  const { isPending: contractLoading, mutate } = useMutation({
    mutationFn: () => contractAPI.getNewContract('Completed'),
    onSuccess: (response) => {
      setContracts(response.data);
      setFilteredData(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting the contract list',
      });
    },
  });
  const { isPending: contractLoadingId, mutate: mutateGetContractId } = useMutation({
    mutationFn: () => contractAPI.getNewContractById(contractId),
    onSuccess: (response) => {
      console.log(response)
      if(response.acceptance){
        setImageSrc(response.acceptance.imageUrl);
      }else{
        setImageSrc();
      }
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting the contract list',
      });
    },
  });
  const showModal = (imageURL) => {
   
    setImageURL(imageURL);
    setIsModalVisible(true);
  };

  useEffect(() => {
    mutate();
  }, []);
  const clickOpenModal = (id) => {
    mutateGetContractId(id)
    setContractId(id);
    setModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${placeholder}`}
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
      title: 'Mã hợp đồng',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id', 'contract ID'),
      render: (text) => (
        <span className='font-poppin text-[14px] font-medium text-[#495057]'>
          {truncateText(text, 20)}
        </span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'description'),
      render: (text) => (
        <span className='font-poppin text-[14px] font-medium'>
          {truncateText(text, 40)}
        </span>
      ),
    },
    {
      title: 'Tên khách hàng',
      dataIndex: ['customer', 'fullName'],
      key: 'customerName',
      ...getColumnSearchProps(['customer', 'fullName'], 'customer name'),
      render: (text, record) => (
        <span className='font-poppin text-[14px] font-medium'>
          {record.customer.fullName}
        </span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createDate',
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
      onFilter: (value, record) => dayjs(record.createAt).format('DD-MM-YYYY').includes(value),
      render: (text) => (
        <span className='font-poppin text-[14px] font-medium'>
          {dayjs(text).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Xem chi tiết',
      key: 'view',
      render: (text, record) => (
        <div className='flex justify-center'>
          <Link
            to={`/construction-detail-done/${record.id}`}
            className='font-poppin text-[13px] font-normal text-green-300-600 inline-block py-[10px] px-[20px]'
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
    {
      title: 'Xem hình ảnh hợp đồng',
      key: 'viewImages',
      render: (text, record) => (
        <div className='flex justify-center'>
          <Button
            type='link'
            className='font-poppin text-[13px] font-normal text-red-600 inline-block py-[10px] px-[20px]'
            onClick={() => showModal(record.imageUrl)} // Pass the image URL here
          >
            Xem hình ảnh
          </Button>
        </div>
      ),
    },
    {
      title: 'Xem bản nghiệm thu',
      key: 'viewAcceptance',
      render: (text, record) => (
        <div className='flex flex-col items-start'>
          <span className='font-poppin text-[14px] font-medium'>
            {record.price}
          </span>
          <Button
            type='link'
            onClick={() => {
             
              // setImageSrc(record.imageUrl);
              clickOpenModal(record.id)
            }}
            className='font-poppin text-[13px] font-normal text-red-600 inline-block py-[10px] px-[20px]'
          >
            Xem bản nghiệm thu
          </Button>
        </div>
      ),
    },
  ];

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <>
      {contextHolder}
      <div className='px-[24px]'>
        <Spin tip='Loading...' spinning={contractLoading}>
          <div className='bg-[white] pt-[13px] pb-[16px]'>
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
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <img src={imageURL} alt='Contract Image' style={{ width: '100%' }} />
      </Modal>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <img src={imageSrc} alt='Acceptance' style={{ width: '100%' }} />
      </Modal>
    </>
  );
}