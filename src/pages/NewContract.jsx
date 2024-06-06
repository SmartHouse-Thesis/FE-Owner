import { Icon } from '@iconify/react';
import user from '../../public/image/user.png';
import { Popconfirm, Spin, message, Table, Input, Button, DatePicker, Pagination as AntPagination } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import contractAPI from '../api/contract';
import { Link } from 'react-router-dom';
import { truncateText } from '../utils/truncate';
import dayjs from 'dayjs';

export function NewContract() {
  const [messageApi, contextHolder] = message.useMessage();
  const [contractId, setContractId] = useState(null); // Ensure initial state is null
  const [contracts, setContracts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilters, setSearchFilters] = useState({
    contractId: '',
    description: '',
    customerName: '',
    createDate: '',
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const { isPending: contractLoading, mutate } = useMutation({
    mutationFn: () => contractAPI.getNewContract('PendingDeposit'),
    onSuccess: (response) => {
      setContracts(response.data);
      setFilteredData(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });

  const { isPending: updateContractLoading, mutate: mutateUpdateContract } = useMutation({
    mutationFn: (params) => contractAPI.updateContract(params, params.id), // Update with params.id
    onSuccess: (response) => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật hợp đồng thành công',
      });
      mutate(); // Refresh the contract list after update
      setContractId(null); // Reset contractId after success
    },
    onError: (response) => {
      messageApi.open({
        type: 'error',
        content: response?.response.data.message,
      });
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  const handleCancelPopUpConfirm = () => {
    setContractId(null); // Reset contractId on cancel
  };

  const showPopconfirm = (contractId) => {
    setContractId(contractId); // Set contractId when showing Popconfirm
  };

  const handleOkPopUpConfirm = () => {
    mutateUpdateContract({
      id: contractId,
      status: 'Cancelled',
    });
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
    filterIcon: (filtered) => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
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
      ...getColumnSearchProps('id', 'mã hợp đồng'),
      render: (text) => (
        <span className="font-poppin text-[14px] font-medium text-[#495057]">
          {truncateText(text, 20)}
        </span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'mô tả'),
      render: (text) => (
        <span className="font-poppin text-[14px] font-medium">
          {truncateText(text, 40)}
        </span>
      ),
    },
    {
      title: 'Tên khách hàng',
      dataIndex: ['customer', 'fullName'],
      key: 'customerName',
      ...getColumnSearchProps(['customer', 'fullName'], 'tên khách hàng'),
      render: (text, record) => (
        <span className="font-poppin text-[14px] font-medium">
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
            onChange={(date) => setSelectedKeys(date ? [dayjs(date).format('DD-MM-YYYY')] : [])}
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
      filterIcon: (filtered) => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => dayjs(record.createAt).format('DD-MM-YYYY').includes(value),
      render: (text) => (
        <span className="font-poppin text-[14px] font-medium">
          {dayjs(text).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Xem chi tiết',
      key: 'view',
      render: (text, record) => (
        <div className="">
          <Link
            to={`/construction/${record.id}`}
            className="font-poppin text-[13px] font-normal text-green-300-600 inline-block "
          >
            Xem chi tiết
          </Link>
        </div>
      ),
    },
    {
      title: 'Hủy hợp đồng',
      key: 'cancel',
      render: (text, record) => (
        <div className="flex justify-center">
          <Popconfirm
            title="Hủy hợp đồng"
            description="Bạn có muốn hủy hợp đồng này không"
            open={contractId === record.id}
            onConfirm={handleOkPopUpConfirm}
            okButtonProps={{
              loading: updateContractLoading,
            }}
            onCancel={handleCancelPopUpConfirm}
          >
            <Icon
              icon="material-symbols:delete-forever-rounded"
              width="20"
              height="20"
              style={{ color: '#2f8e58', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                showPopconfirm(record.id);
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="px-[24px]">
        <Spin tip="Loading..." spinning={contractLoading}>
          <div className="bg-[white] pt-[13px] pb-[16px]">
            <Table
              columns={columns}
              dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
              pagination={false}
              rowKey="id"
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