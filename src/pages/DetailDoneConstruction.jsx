import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import profileImage from '../../public/image/profile.jpeg';
import overlay from '../../public/image/overlayprofile.png';
import github from '../../public/image/github-icon.png';
import { Icon } from '@iconify/react';
import { Pagination } from '../components/Pagination';
import productImg from '../../public/image/clother.png';
import user from '../../public/image/user.png';
import { BreadCrumb } from '../components/BreadCrumb';
import { SearchInput } from '../components/SearchInput';
import Dropzone from 'react-dropzone';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import promotionAPI from '../api/promotion';
import manufactureAPI from '../api/manufacture';
import devicesAPI from '../api/device';
import { formatCurrency } from '../utils/formatCurrentcy';
import packageAPI from '../api/package';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import axiosClient, { axiosFormClient } from '../api/axiosClient';
import dayjs from 'dayjs';
import surveyReport from '../api/survey-report';
import staffAPI from '../api/staff';
import userLoginApi from '../api/user';
import contractAPI from '../api/contract';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Invoices } from './Invoice';
import { ViewInVoices } from './ViewInvoice';
export function DetailDoneConstruction() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [openProduct, setOpenProduct] = useState(false);
  const [openProductSmart, setOpenProductSmart] = useState(false);
  const [devices, setDevices] = useState();
  const [userId, setUserId] = useState();
  const [arrString, setNewArrString] = useState([]);
  const [listStaff, setListStaff] = useState({
    responses: [],
  });
  const [selectedFiles, setselectedFiles] = useState();
  const [filterDevices, setFilterDevices] = useState([]);
  const [listDevices, setListDevice] = useState({
    responses: [],
  });
  const [listSmartDevices, setListSmartDevice] = useState({
    responses: [],
  });
  const [promotion, setPromotion] = useState();
  const [manu, setManu] = useState();
  const [newArr, setNewArr] = useState([]);
  const [newArrSmart, setNewArrSmart] = useState([]);
  const [arrProduct, setArrProduct] = useState([]);
  const [packageId, setPackageId] = useState([]);
  const [devicesRender, setDevicesRender] = useState();
  const [surveyReportList, setSurveyReportList] = useState();
  const { id } = useParams();
  const [contract, setContract] = useState();

  const { isPending: contractDetailLoading, mutate: mutateContractId } =
    useMutation({
      mutationFn: () => contractAPI.getNewContractById(id),
      onSuccess: (response) => {
        console.log(response);
        console.log(123);
        setContract(response);
        const filteredData = response.contractDetails
          .filter((item) => item.type === 'PURCHASE')
          .map((item) => ({
            quantity: item.quantity,
            smartDeviceId: item.smartDeviceId,
          }));

        setFilterDevices(filteredData);
        form.setFieldsValue({
          startPlanDate:
            response?.startPlanDate == null
              ? ''
              : dayjs(response?.startPlanDate, 'YYYY/MM/DD'),
          endPlanDate:
            response?.endPlanDate == null
              ? ''
              : dayjs(response?.endPlanDate, 'YYYY/MM/DD'),
          actualStartDate:
            response?.actualStartDate == null
              ? ''
              : dayjs(response?.actualStartDate, 'YYYY/MM/DD'),
          actualEndDate:
            response?.actualEndDate == null
              ? ''
              : dayjs(response?.actualEndDate, 'YYYY/MM/DD'),
          title: response?.title,
          customer: response?.customer.fullName,
          phoneNumber: response?.customer.phoneNumber,
          staffName: response?.staff.fullName,
          staffPhoneNumber: response.staff.phoneNumber,
          description: response.description,
        });
        const filterContractDetail = response.contractDetails.filter(
          (item) => item.type === 'PURCHASE'
        );
        setNewArrSmart(filterContractDetail);

        const foundItem = newArr.findIndex(
          (item) => item.id == response.devicePackageUsages.id
        );

        if (foundItem == -1) {
          // setNewArr([...newArr, response.devicePackageUsages]);
          setNewArr(response.devicePackageUsages.flat());

          setPackageId([...packageId, response.devicePackageUsages.id]);
        }
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Error occur when get products list',
        });
      },
    });

  const { isPending: contractLoading, mutate } = useMutation({
    mutationFn: () => promotionAPI.getPromotion(),
    onSuccess: (response) => {
      const outputArray = [];

      response.data.forEach((item) => {
        outputArray.push({
          value: item.id,
          label: item.name,
        });
      });
      setPromotion(outputArray);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });
  // const { isPending: manufactureLoading, mutate: MutateManu } = useMutation({
  //   mutationFn: () => manufactureAPI.getManufacture(),
  //   onSuccess: (response) => {
  //     const outputArray = [];

  //     response?.forEach((item) => {
  //       outputArray.push({
  //         value: item.id,
  //         label: item.name,
  //         discount: item.discountAmount,
  //       });
  //     });
  //     setManu(outputArray);
  //   },
  //   onError: () => {
  //     messageApi.open({
  //       type: 'error',
  //       content: 'Error occur when get manufactures list',
  //     });
  //   },
  // });
  const { isPending: userLoginPending, mutate: mutateUserInfo } = useMutation({
    mutationFn: () => userLoginApi.getUserInfo(),
    onSuccess: (response) => {
      // console.log(response);
      setUserId(response.id);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get user',
      });
    },
  });
  //   const { isPending: listStaffLead, mutate: mutateLeadStaff } = useMutation({
  //     mutationFn: () => staffAPI.getLeadStaffAll(),
  //     onSuccess: (response) => {
  //       setListStaff(response);
  //     },
  //     onError: () => {
  //       messageApi.open({
  //         type: 'error',
  //         content: 'Error occur when get manufactures list',
  //       });
  //     },
  //   });
  const { isPending: updateContractLoading, mutate: mutateContract } =
    useMutation({
      mutationFn: (params) => contractAPI.updateContract(params, id),
      onSuccess: (response) => {
        // console.log(response);
        messageApi.open({
          type: 'success',
          content: 'Tạo hợp đồng thành công',
        });
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      },
    });
  const { isPending: deviceListLoading, mutate: mutateDevices } = useMutation({
    mutationFn: () => packageAPI.getPackageDevices(''),
    onSuccess: (response) => {
      const outputArray = [];
      setListDevice(response);

      response.data.forEach((item) => {
        outputArray.push({
          value: item.id,
          label: item.name,
        });
      });

      setDevices(outputArray);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });
  const { isPending: deviceLoading, mutate: mutateSmartDevice } = useMutation({
    mutationFn: () => devicesAPI.getSmartDevice(''),
    onSuccess: (response) => {
      const outputArray = [];
      setListSmartDevice(response);
      response.data.forEach((item) => {
        outputArray.push({
          value: item.id,
          label: item.name,
        });
      });

      setDevicesRender(outputArray);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });
  const increaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArrSmart];

    // Tăng giá trị quantity của phần tử tương ứng
    newArrCopy[index].quantity += 1;
    const filteredDevices = newArrCopy.map((device) => {
      return {
        smartDeviceId: device.smartDeviceId,
        quantity: device.quantity,
      };
    });

    // Cập nhật lại state của newArr với bản sao mới
    setFilterDevices(filteredDevices);
  };

  const decreaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArrSmart];
    // Tăng giá trị quantity của phần tử tương ứng
    if (newArrCopy[index].quantity == 0) {
      newArrCopy[index].quantity = 0;
    } else {
      newArrCopy[index].quantity -= 1;
    }
    const filteredDevices = newArrCopy.map((device) => {
      return {
        smartDeviceId: device.smartDeviceId,
        quantity: device.quantity,
      };
    });

    // Cập nhật lại state của newArr với bản sao mới
    setFilterDevices(filteredDevices);
  };
  const { isPending: surveyReportLoading, mutate: mutateSurveyId } =
    useMutation({
      mutationFn: () => surveyReport.getSurveyReportById(id),
      onSuccess: (response) => {
        setSurveyReportList(response.surveyRequest);
        form.setFieldsValue({
          staffId: response.surveyRequest.staff.accountId,
        });
        const foundItem = newArr.findIndex(
          (item) => item.id == response.recommendDevicePackage.id
        );

        if (foundItem == -1) {
          setNewArr([...newArr, response.recommendDevicePackage]);
          setPackageId([...packageId, response.recommendDevicePackage.id]);
        }

        // console.log(arrProduct);
      },
    });

  useEffect(() => {
    if (id) {
      mutate();
      mutateUserInfo();
      // MutateManu();
      mutateContractId();
      mutateSurveyId();
      mutateDevices();
      // mutateLeadStaff();
      mutateSmartDevice();
    }
  }, [id]);

  const handleChange = (value) => {
    // console.log(value)
    const updatedArr = [...newArr];
    const newArrString = [];
    for (let i = 0; i <= listDevices.data.length; i++) {
      if (listDevices.data[i]?.id == value) {
        let existingItemIndex = updatedArr.findIndex(
          (item) => item.id == listDevices.data[i].id
        );
        if (existingItemIndex == -1) {
          listDevices.data[i];
          console.log(listDevices.data[i]);
          updatedArr.push({
            devicePackageId: listDevices.data[i].id,
            name: listDevices.data[i].name,
            discountAmount: listDevices?.data[i]?.promotions
              ? listDevices?.data[i]?.promotions[0].discountAmount
              : '',
            price: listDevices.data[i].price,
            manufacturer: listDevices.data[i].manufacturer.name,
            image: listDevices.data[i].images[0].url,
            warrantyDuration: listDevices.data[i].warrantyDuration,
            startWarranty: null,
            endWarranty: null,
            createAt: listDevices.data[i].createAt,
          });
          //   setPackageId([...packageId, listDevices.data[i].id]);
          //   updatedArr[existingItemIndex].quantity++;
        } else {
          return;
          // updatedArr.push(newArray[i]);
        }
      }
    }
    updatedArr.map((item) => newArrString.push(item.devicePackageId));
    setNewArrString(newArrString);
    setNewArr(updatedArr);
  };
  const handleSmartChange = (value) => {
    const updatedArr = [...newArrSmart];
    console.log(listSmartDevices);
    let newArrSmartList = listSmartDevices.data.map((item) => {
      return {
        ...item,
        quantity: 1,
      };
    });

    for (let i = 0; i <= newArrSmartList.length; i++) {
      if (newArrSmartList[i]?.id == value) {
        let existingItemIndex = updatedArr.findIndex(
          (item) => item.smartDeviceId == newArrSmartList[i].id
        );

        if (existingItemIndex != -1) {
          updatedArr[existingItemIndex].quantity++;
        } else {
          updatedArr.push({
            smartDeviceId: newArrSmartList[i].id,
            name: newArrSmartList[i].name,
            price: newArrSmartList[i].price,
            manufacturer: newArrSmartList[i].manufacturer.name,
            type: newArrSmartList[i].deviceType,
            installationPrice: newArrSmartList[i].installationPrice,
            createAt: newArrSmartList[i].createAt,
            quantity: 1,
            image: newArrSmartList[i].images[0].url,
          });
        }
      }
    }
    // console.log(updatedArr)
    const filteredDevices = updatedArr.map((device) => {
      return {
        smartDeviceId: device.smartDeviceId,
        quantity: device.quantity,
      };
    });
    console.log(filterDevices);
    console.log(updatedArr);
    setFilterDevices(filteredDevices);
    setNewArrSmart(updatedArr);
  };

  const totalAllPrice = () => {
    const productPrice = newArrSmart.reduce((total, item) => {
      const devicePrice = item.price * item.quantity;
      const installationPrice = item.installationPrice * item.quantity;
      return total += (devicePrice + installationPrice);
  }, 0);
    const smartDevicePrice = newArr.reduce((total, packageItem) => {
      let packagePrice = packageItem.price;
      if (packageItem.discountAmount) {
          packagePrice = packageItem.price - (packageItem.price * (packageItem.discountAmount / 100));
      }
      return total += packagePrice;
  }, 0);
    const totalPrice = productPrice + smartDevicePrice;
    return totalPrice;
  };


  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setselectedFiles(files[0]);
  }
  const totalPriceAll = (arr) => {
    let total = 0;

    arr.forEach((product) => {
      const discountPrice =
        product.price * (product.promotion.discountAmount / 100);
      total += product.price - discountPrice;
    });
    return total;
  };
  const onSubmitUpdateContract = (response) => {
    // console.log(response, id, filterDevices[0].smartDeviceId);
    const form = new FormData();
    form.append('title', response.title);
    form.append('description', response.description);
    for (var i = 0; i < arrString.length; i++) {
      form.append('devicePackages', arrString[i]);
    }
    for (var i = 0; i < filterDevices.length; i++) {
      form.append('contractDetails', JSON.stringify(filterDevices[i]));
    }
    mutateContract(form);
  };
  const filterRemoveHandle = (itemId) => {
    const arrRemove = newArrSmart.filter(
      (item) => item.smartDeviceId !== itemId
    );
    const newFilterDevices = filterDevices.filter(
      (item) => item.smartDeviceId !== itemId
    );
    console.log(newFilterDevices);
    setNewArrSmart(arrRemove);
    setFilterDevices(newFilterDevices);
  };
  console.log(<Invoices />);
  return (
    <>
      {contextHolder}
      <div
        className='relative -z-50'
        style={{
          width: '100%',
          height: '260px',
          backgroundImage: `url(${overlay})`,
          backgroundSize: 'cover',
        }}
      >
        <div className='absolute w-full h-[260px] bg-[#405189] opacity-60'></div>
      </div>
      <Form form={form} layout='vertical' onFinish={onSubmitUpdateContract}>
        <div className='pr-[23px] pl-[70px] pt-[20px] -mt-[200px]'>
          <div className='grid grid-cols-[1fr] gap-[30px] items-start'>
            <div className='bg-white shadow-md'>
              <div className='px-[24px] py-[20px]'>
                <div className='mb-[20px]'>
                <div className='flex gap-[10px] justify-between'>
                    <Link
                      to='/construction'
                      className='bg-red-400 px-[10px] py-[5px] rounded-[4px]'
                    >
                      Quay lại
                    </Link>
                    <div className='flex gap-[10px] items-center'>
                      <Link
                        to={`/invoices/${id}`}
                        className='bg-amber-200 px-[10px] py-[5px] rounded-[4px]'
                      >
                        Xem hợp đồng
                      </Link>
                      <ViewInVoices />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item
                        label='Ngày lắp đặt dự kiến'
                        name='startPlanDate'
                      >
                        <DatePicker
                          disabled
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item label='Ngày kết thúc dự kiến' name='dateEnd'>
                        <DatePicker
                          disabled
                          style={{
                            width: '100%',
                          }}
                          value={dayjs(
                            // dayjs(surveyDetail?.surveyDate).format(
                            //   'YYYY-MM-DD'
                            // ),
                            'YYYY-MM-DD'
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item label='Chọn nhân viên lắp đặt' name='staffId'>
                        <Select
                          placeholder='Chọn nhân viên lắp đặt'
                          style={{
                            width: '100%',
                          }}
                          open={openDate}
                          onDropdownVisibleChange={(visible) =>
                            setOpenDate(visible)
                          }
                          defaultValue={surveyReportList?.staff.accountId}
                        >
                          {listStaff.data?.map((item, index) => (
                            <Option value={item.leadAccountId} key={index}>
                              {item.leadFullName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div> */}
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item
                        label='Ngày bắt đầu thực tế'
                        name='dateStartActual'
                      >
                        <DatePicker
                          disabled
                          style={{
                            width: '100%',
                          }}
                          value={dayjs(
                            // dayjs(surveyDetail?.surveyDate).format(
                            //   'YYYY-MM-DD'
                            // ),
                            'YYYY-MM-DD'
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item
                        label='Ngày kết thúc thực tế'
                        name='dateEndActual'
                      >
                        <DatePicker
                          disabled
                          style={{
                            width: '100%',
                          }}
                          value={dayjs(
                            // dayjs(surveyDetail?.surveyDate).format(
                            //   'YYYY-MM-DD'
                            // ),
                            'YYYY-MM-DD'
                          )}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <Form.Item label='Tên hợp đồng' name='title'>
                      <Input
                        //    disabled
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Name of contract'
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className='w-full'>
                    <Form.Item label='Tên khách hàng' name='customer'>
                      <Input
                        disabled
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Customer full name'
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className='w-full'>
                    <Form.Item
                      label='Số điện thoại khách hàng'
                      name='phoneNumber'
                    >
                      <Input
                        disabled
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Phone number'
                      ></Input>
                    </Form.Item>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <Form.Item label='Tên nhân viên' name='staffName'>
                      <Input
                        disabled
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Staff name'
                      ></Input>
                    </Form.Item>
                  </div>
                  <div className='w-full'>
                    <Form.Item
                      label='Số điện thoại nhân viên'
                      name='staffPhoneNumber'
                    >
                      <Input
                        disabled
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Input staff phonnumber'
                      ></Input>
                    </Form.Item>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <Form.Item label='Nhập mô tả' name='description'>
                      <TextArea
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Input description'
                        rows={8}
                      ></TextArea>
                    </Form.Item>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Gói sản phẩm gợi ý
                      </label>
                    </div>
                    <div className='w-full'>
                      <Select
                        showSearch
                        className=''
                        style={{
                          width: '100%',
                        }}
                        value={undefined}
                        placeholder='Select product of manufacture'
                        open={openProduct}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChange}
                        options={devices}
                        onDropdownVisibleChange={(visible) =>
                          setOpenProduct(visible)
                        }
                        dropdownRender={(menu) => <div>{menu}</div>}
                      >
                        {devices?.map((item) => (
                          <Option value={item.value}>{item.label}</Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Sản phẩm (của hãng)
                      </label>
                    </div>
                    <div className='w-full'>
                      <Select
                        showSearch
                        className=''
                        style={{
                          width: '100%',
                        }}
                        value={undefined}
                        placeholder='Select product of manufacture'
                        open={openProductSmart}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleSmartChange}
                        options={devicesRender}
                        onDropdownVisibleChange={(visible) =>
                          setOpenProductSmart(visible)
                        }
                        dropdownRender={(menu) => <div>{menu}</div>}
                      >
                        {devicesRender?.map((item) => (
                          <Option value={item.value}>{item.label}</Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_480px] items-start mt-[20px] gap-[30px]'>
            <div className='px-[24px] pt-[24px]'>
              <div className='bg-[white]  pt-[13px] pb-[16px] shadow-md'>
                <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
                  {/* <SearchInput /> */}
                </div>
                <table className='w-full'>
                  <tr className='w-full'>
                    <th className='w-[40%] pl-[20px] text-start font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Tên gói thiết bị
                    </th>
                    <th className='w-[20%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Giá
                    </th>
                    <th className='w-[20%] pl-[20px] text-center  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Mã giảm
                    </th>
                    <th className='w-[20%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Tổng tiền
                    </th>
                  </tr>
                  {newArr?.map((item, index) => (
                    <tr className='border-t border-b border-[#E9EBEC] '>
                      <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                        <img src={item?.image} className='w-[24px] h-[24px]' />
                        <div className='flex flex-col'>
                          <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className=''>
                        <div className='flex flex-col items-start'>
                          <span className='text-center font-poppin text-[14px] font-medium'>
                            {formatCurrency(item?.price)}
                          </span>
                        </div>
                      </td>
                      <td className=''>
                        <div className='flex flex-col items-center'>
                          <span className='text-center font-poppin text-[14px] font-medium'>
                            {item?.discountAmount}%
                          </span>
                        </div>
                      </td>
                      <td className=''>
                        <div className='flex flex-col items-start'>
                          <span className='text-center font-poppin text-[14px] font-medium'>
                            {formatCurrency(
                              item?.price -
                                item?.price * (item?.discountAmount * 0.01)
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
                <Pagination />
              </div>
              <div className='px-[24px] pt-[24px]'>
                <div className='bg-[white]  pt-[13px] pb-[16px] shadow-md'>
                  <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
                    {/* <SearchInput /> */}
                  </div>
                  <table className='w-full'>
                    <tr className='w-full'>
                      <th className='w-[40%] pl-[20px] text-start font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Tên thiết bị
                      </th>
                      <th className='w-[20%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Số lượng
                      </th>
                      <th className='w-[15%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Giá
                      </th>
                      <th className='w-[15%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Giá lắp đặt
                      </th>

                    </tr>
                    {newArrSmart?.map((item, index) => (
                      <tr className='border-t border-b border-[#E9EBEC] '>
                        <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                          <img
                            src={item?.image}
                            className='w-[24px] h-[24px]'
                          />
                          <div className='flex flex-col'>
                            <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                              {item?.name}
                            </span>
                          </div>
                        </td>
                        <td className='px-[20px]'>
                          <div class='flex items-center'>
 
                            <input
                              type='text'
                              class='quantity-input bg-white focus:outline-none focus:ring focus:border-blue-300 border-l border-r w-16 text-center'
                              value={item?.quantity}
                            ></input>

                          </div>
                        </td>
                        <td className=''>
                          <div className='flex flex-col items-start'>
                            <span className='text-center font-poppin text-[14px] font-medium'>
                              {formatCurrency(item?.price * item?.quantity)}
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className=' '>
                            <span className='pl-[20px] text-center font-poppin text-[14px] font-medium'>
                              {formatCurrency(item?.installationPrice)}
                            </span>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </table>
                  <Pagination />
                </div>
              </div>
            </div>

            <div className='py-[20px] px-[20px] shadow-md'>
              <div className='flex items-center justify-between mb-[20px]'>
                <span className='font-poppin font-medium text-[16px]'>Giá</span>
              </div>
              <div className='border-b border-[#000] pb-[20px]'>
                <div className='flex items-center justify-between'>
                  <span className='inline-block font-poppin font-normal text-[16px] mb-[15px]'>
                    Tổng giá
                  </span>
                  <span className='inline-block font-poppin font-normal text-[16px] mb-[15px]'>
                    {formatCurrency(totalAllPrice())}
                  </span>
                </div>
                <br></br>
                {/* <div className='flex items-center justify-between'>
                  <span className='inline-block font-poppin font-normal text-[16px]'>
                    Chiết khấu
                  </span>
                  <span className='inline-block font-poppin font-normal text-[16px]'>
                    {promotionId?.discountAmount}%
                  </span>
                </div> */}
              </div>
              <div className='flex items-center justify-between mt-[20px]'>
                <span className='inline-block font-poppin font-normal text-[16px] mb-[15px]'>
                  Tổng
                </span>
                <span className='inline-block font-poppin font-normal text-red-500 text-[16px] mb-[15px]'>
                  {formatCurrency(totalAllPrice())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
