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
  Pagination as AntPagination,
  Tabs,
} from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import surveyAPI from '../api/request';
import TextArea from 'antd/es/input/TextArea';
import staffAPI from '../api/staff';
import dayjs from 'dayjs';
import { useDebounce } from '../hook/useDebounce';
import contractAPI from '../api/contract';
import { Link, useNavigate } from 'react-router-dom';
import customerAPI from '../api/customer';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export function RequetsPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [survey, setSurvey] = useState({ responses: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useDebounce('', 500);
  const [staff, setStaff] = useState([]);
  const [surveyDetail, setSurveyDetail] = useState();
  const [contractDetail, setContractDetail] = useState();
  const [surveyId, setSurveyId] = useState(0);
  const [contractId, setContractId] = useState();
  const [surveyDate, setSurveyDate] = useState(new Date());
  const [renderModal, setRenderModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [contracts, setContracts] = useState([]); // State for contract modification requests
  const [filteredContracts, setFilteredContracts] = useState([]); // State for filtered contract modification requests
  const [searchFilters, setSearchFilters] = useState({
    customer: '',
    address: '',
    phoneNumber: '',
    surveyDate: '',
  });
  const navigate = useNavigate();
  const [contractFilters, setContractFilters] = useState({
    contractID: '',
    type: '',
    status: '',
    date: '',
  }); // State for contract modification filters
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

  const showDetailModal = (ContractId) => {
    setContractId(ContractId);
    if (ContractId) {
      mutateDetailId(ContractId);
    }
    setIsDetailOpen(true);
  };

  const handleDetailOk = () => {
    setIsDetailOpen(false);
  };

  const handleDetailCancel = () => {
    setIsDetailOpen(false);
  };

  const showUpdateStatusModal = (contract) => {
    setContractId(contract);
    setSelectedContract(contract);
    setIsUpdateStatusOpen(true);
  };

  const handleUpdateStatusOk = (values) => {
    mutateUpdateContract({
      "status": values.status,
      "description": values.description
    })
    setIsUpdateStatusOpen(false);
  };

  const handleUpdateStatusCancel = () => {
    setIsUpdateStatusOpen(false);
  };

  const selectDateHandler = (date) => {
    if (date) {
      setRenderModal(true);
    }
  };

  const { isPending: staffLoading, mutate: mutateStaff } = useMutation({
    mutationFn: () => staffAPI.getLeadStaffById(surveyDate),
    onSuccess: (response) => {
      const outputArray = response.map((item) => ({
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
  const { isPending: updateContractLoading, mutate: mutateUpdateContract } =
    useMutation({
      mutationFn: (params) => contractAPI.updateContractModificationRequestId(params, contractId),
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Cập nhật yêu cầu hợp đồng thành công',
        });
      },
      onError: (response) => {
        messageApi.open({
          type: 'error',
          content: response?.response.data.message,
        });
      },
    });
  const { isPending: surveyDetailLoading, mutate: mutateSurveyId } = useMutation({
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

  const { isPending: detailContractRequest, mutate: mutateDetailId } = useMutation({
    mutationFn: (contractId) => contractAPI.getContractModificationRequestsId(contractId),
    onSuccess: (response) => {
      setContractDetail(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get manufactures list',
      });
    },
  });

  const { isPending: addRequestSurveyToUser, mutate: mutaateAddRequestSurvey } = useMutation({
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

  const { isPending: contractListLoading, mutate: mutateContracts } = useMutation({
    mutationFn: () => contractAPI.getContractModificationRequests(),
    onSuccess: (response) => {
      setContracts(response.data);
      setFilteredContracts(response.data);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occurred when getting contract modification requests',
      });
    },
  });

  useEffect(() => {
    mutate(value);
    mutateContracts();
  }, [addRequestSurveyToUser, value,updateContractLoading]);

  const onSubmitCreateSurvey = (response) => {
    mutaateAddRequestSurvey({
      surveyId: surveyId,
      surveyDate: response.surveyDate.format('YYYY-MM-DD'),
      staffId: response.customerId,
      description: response.description,
    });
  };

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

  const handleFilterChange = (e, fieldName) => {
    const value = e.target.value.toLowerCase();
    setSearchFilters((prev) => ({ ...prev, [fieldName]: value }));

    const filtered = survey.data.filter((item) => {
      const customerName = item.customer.fullName.toLowerCase();
      const customerAddress = item.customer.address.toLowerCase();
      const customerPhone = item.customer.phoneNumber.toLowerCase();
      const surveyDate = dayjs(item.surveyDate).format('DD-MM-YYYY').toLowerCase();

      return (
        customerName.includes(searchFilters.customer.toLowerCase()) &&
        customerAddress.includes(searchFilters.address.toLowerCase()) &&
        customerPhone.includes(searchFilters.phoneNumber.toLowerCase()) &&
        surveyDate.includes(searchFilters.surveyDate.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  const handleContractFilterChange = (e, fieldName) => {
    const value = e.target.value.toLowerCase();
    setContractFilters((prev) => ({ ...prev, [fieldName]: value }));

    const filtered = contracts.filter((item) => {
      const contractID = item.contractID.toLowerCase();
      const type = item.type.toLowerCase();
      const status = item.status.toLowerCase();
      const date = dayjs(item.date).format('DD-MM-YYYY').toLowerCase();

      return (
        contractID.includes(contractFilters.contractID) &&
        type.includes(contractFilters.type) &&
        status.includes(contractFilters.status) &&
        date.includes(contractFilters.date)
      );
    });

    setFilteredContracts(filtered);
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    const filtered = survey.data.filter((item) => {
      const surveyDate = dayjs(item.surveyDate);
      return surveyDate.isBetween(start, end, null, '[]');
    });
    setFilteredData(filtered);
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
          Lọc
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

  const translateType = (type) => {
    switch (type) {
      case 'Modify':
        return <span style={{ color: 'green' }}>Thay đổi hợp đồng</span>;
      case 'Cancel':
        return <span style={{ color: 'orange' }}>Hủy hợp đồng</span>;
      default:
        return type;
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'Pending':
        return <span style={{ color: 'orange' }}>Chờ xử lý</span>;
      case 'Approved':
        return <span style={{ color: 'green' }}>Đã duyệt</span>;
      case 'Rejected':
        return <span style={{ color: 'red' }}>Từ chối</span>;
      default:
        return status;
    }
  };

  const surveyColumns = [
    {
      title: 'Khách hàng',
      dataIndex: ['customer', 'fullName'],
      key: 'customer',
      ...getColumnSearchProps('customer.fullName', 'khách hàng', 'customer.fullName'),
      render: (text, record) => (
        <div className="flex gap-[8px] justify-start items-center">
          <img src={user} alt="User Avatar" />
          <div className="flex flex-col">
            <span className="font-poppin text-[14px] font-medium text-[#495057]">
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
      ...getColumnSearchProps('customer.address', 'địa chỉ', 'customer.address'),
      render: (text, record) => (
        <div className="">
          <span className="font-poppin text-[14px] font-medium">
            {record.customer.address}
          </span>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['customer', 'phoneNumber'],
      key: 'phoneNumber',
      ...getColumnSearchProps('customer.phoneNumber', 'số điện thoại', 'customer.phoneNumber'),
      render: (text, record) => (
        <div className="">
          <span className="font-poppin text-[14px] font-medium">
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
            onChange={(date) => setSelectedKeys(date ? [dayjs(date).format('DD-MM-YYYY')] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90, marginRight: 8 }}>
            Lọc
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => <Icon icon="mdi:filter" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => dayjs(record.surveyDate).format('DD-MM-YYYY').includes(value),
      render: (text, record) => (
        <div className="">
          <span className="font-poppin text-[14px] font-medium">
            {dayjs(record.surveyDate).format('DD-MM-YYYY')}
          </span>
        </div>
      ),
    },
    {
      title: 'Gán nhân viên',
      key: 'assign',
      render: (text, record) => (
        <div className="">
          <button
            onClick={() => showModal(record.id, record.surveyDate)}
            className="rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#3fc055]"
          >
            Gán nhân viên
          </button>
        </div>
      ),
    },
  ];

  const contractColumns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: 'contractId',
      key: 'contractId',
      ...getColumnSearchProps('contractId', 'mã hợp đồng', 'contractId'),
    },
    {
      title: 'Loại yêu cầu',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type', 'loại yêu cầu', 'type'),
      render: (type) => translateType(type),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status', 'trạng thái', 'status'),
      render: (status) => translateStatus(status),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      filterDropdown: () => (
        <RangePicker onChange={handleDateRangeChange} />
      ),
      filterIcon: () => <Icon icon='material-symbols:date-range' />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div className='flex gap-2'>
          <Button onClick={() => showDetailModal(record.id)}>Xem chi tiết</Button>
          <Button onClick={() => showUpdateStatusModal(record.id)}>Cập nhật trạng thái</Button>
        </div>
      ),
    },
  ];

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <>
      {contextHolder}

      <Modal
        open={isDetailOpen}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="contact" onClick={(e) => {
            mutateCustomer(contractDetail.customerId);
            navigate(`/chat/${contractDetail.id}`)
          }}>
            Liên hệ với khách hàng
          </Button>,
          <Button key="ok" type="primary" onClick={handleDetailOk}>
            OK
          </Button>,
        ]}
      >
        <div className="flex items-center justify-between mb-[20px]">
          <span>Xem yêu cầu</span>
        </div>
        <Spin tip="Loading..." spinning={surveyDetailLoading}>
          <span>Mã hợp đồng</span>
          <Input
            disabled
            style={{ width: '100%', marginBottom: '15px' }}
            value={contractDetail?.contractId}
          />
          <span>Ngày yêu cầu</span>
          <DatePicker
            disabled
            style={{ width: '100%', marginBottom: '15px' }}
            value={dayjs(dayjs(contractDetail?.createAt).format('YYYY-MM-DD'), 'YYYY-MM-DD')}
          />
          <span>Mô tả</span>
          <Input
            disabled
            style={{ width: '100%', marginBottom: '15px' }}
            value={contractDetail?.description}
          />
        </Spin>
      </Modal>

      <Modal
        open={isUpdateStatusOpen}
        onOk={handleUpdateStatusOk}
        onCancel={handleUpdateStatusCancel}
        footer={[
          <Button key="cancel" onClick={handleUpdateStatusCancel}>
            Hủy
          </Button>,
          <Button key="update" type="primary" form="updateStatusForm" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <div className="flex items-center justify-between mb-[20px]">
          <span>Cập nhật trạng thái</span>
        </div>
        <Form layout="vertical" id="updateStatusForm" onFinish={handleUpdateStatusOk}>
          <Form.Item label="Trạng thái" name="status">
            <Select placeholder="Chờ xử lý">
              <Select.Option value="Approved">Đã duyệt</Select.Option>
              <Select.Option value="Rejected">Từ chối</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <TextArea required placeholder="Nhập mô tả"></TextArea>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        cancelText={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className="flex items-center justify-between mb-[20px]">
          <span>Gán nhân viên</span>
        </div>
        <Form layout="vertical" onFinish={onSubmitCreateSurvey}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item label="Chọn ngày" name="surveyDate">
                <DatePicker
                  className="w-full"
                  showTime
                  format="YYYY-MM-DD"
                  onChange={selectDateHandler}
                  disabledDate={disabledDate} // Prevent selecting past dates
                />
              </Form.Item>
              {renderModal ? (
                <>
                  <Form.Item label="Chọn nhân viên" name="customerId">
                    <Select
                      placeholder="Select staff"
                      style={{ width: '100%' }}
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
                  <Form.Item label="Nội dung" name="description">
                    <TextArea required placeholder="Nhập nội dung"></TextArea>
                  </Form.Item>
                </>
              ) : (
                ''
              )}
            </Col>

            <Col span={24}>
              <div className="flex justify-end gap-4">
                <Button onClick={handleCancel}>Hủy</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addRequestSurveyToUser}
                >
                  Gán nhân viên
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className="px-[24px] pt-[24px]">
        <Spin tip="Loading..." spinning={surveyListLoading || contractListLoading}>
          <div className="bg-[white] pt-[13px] pb-[16px]">
            <Tabs defaultActiveKey="1" className='px-[20px]'>
              <TabPane tab="Danh sách yêu cầu khảo sát" key="1">
                <div className="flex items-center justify-between px-[14px] mb-[15px]">
                  <span className="text-[#495057] font-poppin font-medium text-[16px]">
                    Danh sách yêu cầu khảo sát
                  </span>
                </div>
                <Table
                  columns={surveyColumns}
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
              </TabPane>
              <TabPane tab="Danh sách yêu cầu thay đổi hợp đồng" key="2">
                <div className="flex items-center justify-between px-[14px] mb-[15px]">
                  <span className="text-[#495057] font-poppin font-medium text-[16px]">
                    Danh sách yêu cầu thay đổi hợp đồng
                  </span>
                </div>
                <Table
                  columns={contractColumns}
                  dataSource={filteredContracts.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                  pagination={false}
                  rowKey="contractID"
                />
                <AntPagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredContracts.length}
                  onChange={handlePaginationChange}
                  showSizeChanger
                  onShowSizeChange={(current, size) => setPageSize(size)}
                  style={{ textAlign: 'right', marginTop: 20 }}
                />
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>
    </>
  );
}