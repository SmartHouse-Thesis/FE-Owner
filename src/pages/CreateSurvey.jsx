import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
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
import PurePanel from 'antd/es/tooltip/PurePanel';
export function CreateSurvey() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openManu, setOpenManu] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openProductSmart, setOpenProductSmart] = useState(false);
  const [devices, setDevices] = useState();
  const [idPromote, setIdPromote] = useState(0);
  const [userId, setUserId] = useState();
  const [listStaff, setListStaff] = useState({
    responses: [],
  });
  const [newPromotion, setNewPromotion] = useState(0);
  const [selectedFiles, setselectedFiles] = useState();
  const [filterDevices, setFilterDevices] = useState([]);
  const [promotionItem, setPromotionItem] = useState();
  const [recommendPackage, setRecommendPackage]= useState();
  const [listDevices, setListDevice] = useState({
    responses: [],
  });
  const [listSmartDevices, setListSmartDevice] = useState({
    responses: [],
  });
  const [newDevices, setNewDevices] = useState();
  const [promotion, setPromotion] = useState();
  const [manu, setManu] = useState();
  const [newArr, setNewArr] = useState([]);
  const [newArrSmart, setNewArrSmart] = useState([]);
  const [arrProduct, setArrProduct] = useState([]);
  const [packageId, setPackageId] = useState([]);
  const [arrString, setNewArrString] = useState([]);
  const [devicesRender, setDevicesRender] = useState();
  const [surveyReportList, setSurveyReportList] = useState();
  let { id } = useParams();
  const navigate = useNavigate();
  const dateInstall = [
    {
      date: 1,
      label: '1 Ngày',
    },
    {
      date: 2,
      label: '2 Ngày',
    },
    {
      date: 3,
      label: '3 Ngày',
    },
  ];

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
  const { isPending: listStaffLead, mutate: mutateLeadStaff } = useMutation({
    mutationFn: () => staffAPI.getLeadStaffAll(),
    onSuccess: (response) => {
      setListStaff(response);
      console.log(listStaff);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get manufactures list',
      });
    },
  });
  const { isPending: createSurveyReportLoading, mutate: mutateContract } =
    useMutation({
      mutationFn: (params) => contractAPI.createContract(params),
      onSuccess: (response) => {
        // console.log(response);
        messageApi.open({
          type: 'success',
          content: 'Tạo thành công hợp đồng',
        });
        setTimeout(() => {
          navigate("/survey")
        }, 1000)
      },
      onError: (error) => {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      },
    });
  const { isPending: deviceListLoading, mutate: mutateDevices } = useMutation({
    mutationFn: () => packageAPI.getPackageDevicesListContract(recommendPackage),

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
    mutationFn: () => devicesAPI.getSmartDeviceAll(),
    onSuccess: (response) => {
      console.log(response);
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
    newArrCopy[index].smartDeviceQuantity += 1;
    const filteredDevices = newArrCopy.map((device) => {
      return {
        smartDeviceId: device.smartDevice.id,
        quantity: device.smartDeviceQuantity,
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
      newArrCopy[index].smartDeviceQuantity = 0;
    } else {
      newArrCopy[index].smartDeviceQuantity -= 1;
    }
    const filteredDevices = newArrCopy.map((device) => {
      return {
        smartDeviceId: device.smartDevice.id,
        quantity: device.smartDeviceQuantity,
      };
    });

    // Cập nhật lại state của newArr với bản sao mới
    setFilterDevices(filteredDevices);
  };
  const calculateDiscountedPrice = (price, quantity, discount) => {
    if (typeof price === 'number' && typeof discount === 'number') {
      return (price * quantity) - price * (discount / 100);
    }
    return price; // Nếu không có discount, trả về giá gốc
  };
  const { isPending: surveyReportLoading, mutate: mutateSurveyId } =
    useMutation({
      mutationFn: () => surveyReport.getSurveyReportById(id),
      onSuccess: (response) => {
        setRecommendPackage(response.recommendDevicePackage.manufacturer.name)
      
        setSurveyReportList(response.surveyRequest);
        form.setFieldsValue({
          staffId: response.surveyRequest.staff.accountId,
        });
        const uniquePackages = [];
        const packageIdItem = [];
          if (response.recommendDevicePackage) {
            uniquePackages.push({ ...response.recommendDevicePackage, quantity: 1 });
  
          }
          setPackageId([...packageId, response.recommendDevicePackage.id]);
          packageIdItem.push(response.recommendDevicePackage.id);
          setNewArr(uniquePackages);
          setNewArrString(packageIdItem);
        // console.log(arrProduct);
      },
      onError: () => {},
    });

  useEffect(() => {
    // MutateManu();
    if(recommendPackage){
      mutateDevices(recommendPackage);
    }
    if (id) {
      mutateSurveyId();
      mutateDevices();
      mutateLeadStaff();
      mutateSmartDevice();
      mutate();
      mutateUserInfo();
    }
  }, [id, recommendPackage]);
  const increaseQuantityPackage = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];

    // Tăng giá trị quantity của phần tử tương ứng
    newArrCopy[index].quantity += 1;
    setNewArr(newArrCopy);
    // const filteredDevices = newArrCopy.map((device) => {
    //   return {
    //     smartDeviceId: device.smartDeviceId,
    //     quantity: device.quantity,
    //   };
    // });
    arrString.push(newArrCopy[index].id);
    
  };

  const decreaseQuantityPackage = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];
    // Tăng giá trị quantity của phần tử tương ứng
    if (newArrCopy[index].quantity == 0) {
      newArrCopy[index].quantity = 0;
    } else {
      newArrCopy[index].quantity -= 1;
    }

    setNewArr(newArrCopy);
    const indexT = arrString.indexOf(newArrCopy[index].id);
    if (indexT !== -1) {
      arrString.splice(index, 1);
    }

    console.log(arrString);
    // const filteredDevices = newArrCopy.map((device) => {
    //   return {
    //     smartDeviceId: device.smartDeviceId,
    //     quantity: device.quantity,
    //   };
    // });

    // Cập nhật lại state của newArr với bản sao mới
    // setFilterDevicesPackage(filteredDevices);
  };
  const handleChange = (value) => {
    const updatedArr = [...newArr];
    const newArrString = [];
    let newArrList = listDevices.data.map((item) => {
      return {
        ...item,
        quantity: 1,
      };
    });
    for (let i = 0; i < newArrList.length; i++) {
      // Fixed the loop condition to < instead of <=
      if (newArrList[i]?.id === value) {
        let existingItemIndex = updatedArr.findIndex(
          (item) => item.devicePackageId === value
        );

        if (existingItemIndex === -1) {
          const discountAmount =
            newArrList[i].promotions.length === 0
              ? 0
              : newArrList[i].promotions[0].discountAmount;

          updatedArr.push({
            devicePackageId: newArrList[i].id,
            name: newArrList[i].name,
            discountAmount: discountAmount,
            price: newArrList[i].price,
            quantity: 1,
            manufacturer: newArrList[i].manufacturer.name,
            image: newArrList[i].images[0].url,
            warrantyDuration: newArrList[i].warrantyDuration,
            startWarranty: null,
            endWarranty: null,
            createAt: newArrList[i].createAt,
          });
        } else {
          return;
        }
      }
    }
    updatedArr.forEach((item) => newArrString.push(item.devicePackageId));
    setNewArrString(newArrString);
    setNewArr(updatedArr);
  };
  const handleSmartChange = (value) => {
    // console.log(value)
    // console.log(newArr);

    const updatedArr = [...newArrSmart];
    let newArray = listSmartDevices.data.map((item) => {
      return {
        ...item,
        quantity: 1,
      };
    });
    // console.log(newArray);
    for (let i = 0; i <= newArray.length; i++) {
      if (newArray[i]?.id == value) {
        let existingItemIndex = updatedArr.findIndex(
          (item) => item.smartDevice.id == newArray[i].id
        );
        if (existingItemIndex != -1) {
          updatedArr[existingItemIndex].smartDeviceQuantity++;
        } else {
          //   console.log({
          //     smartDeviceQuantity: 1,
          //     smartDevice: {
          //       ...newArray[i],
          //     },
          //   });
          const newArrayObject = {
            smartDeviceQuantity: 1,
            smartDevice: {
              ...newArray[i],
            },
          };
          updatedArr.push(newArrayObject);
        }
      }
    }
    // console.log(updatedArr)
    const filteredDevices = updatedArr.map((device) => {
      return {
        smartDeviceId: device.smartDevice.id,
        quantity: device.smartDeviceQuantity,
      };
    });
    console.log(updatedArr);
    setFilterDevices(filteredDevices);
    setNewArrSmart(updatedArr);
  };
  const totalAllPrice = () => {
    const productPrice = newArr.reduce((total, product) => {
      let productPrice = product.price;
      if (product.promotions && product.promotions.length > 0) {
        const discount = product.promotions[0].discountAmount;
        productPrice = (product.price * product.quantity) - product.price * (discount / 100);
      }else{
        productPrice = (product.price * product.quantity)
      }
      return (total += productPrice);
    }, 0);
    const smartDevicePrice = newArrSmart.reduce((total, item) => {
      const device = item.smartDevice;
      const devicePrice = device.price * item.smartDeviceQuantity;
      const installationPrice =
        device.installationPrice * item.smartDeviceQuantity;
      return (total += devicePrice + installationPrice);
    }, 0);
    const totalPrice = productPrice + smartDevicePrice;
    return totalPrice
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
  const onSubmitCreateSurvey = (response) => {
    function checkEmptyArrayAndZeroQuantity(arrString, filterDevices) {
      // Kiểm tra mảng rỗng
      const isEmptyArray = arrString.length === 0;
      const hasOnlyZeroQuantity = filterDevices.every(item => item.quantity === 0);
  
      // Trả về true nếu cả hai điều kiện đều thỏa mãn
      return isEmptyArray && hasOnlyZeroQuantity;
  

  }
    // console.log(response, id, userId);
    // console.log(response, id, filterDevices[0].smartDeviceId);
    if(checkEmptyArrayAndZeroQuantity(arrString, filterDevices)){
      messageApi.open({
        type: 'error',
        content: 'Không có sản phẩm nào để tạo hợp đồng',
      });
      return;
    }else{
      mutateContract({
        surveyId: id,
        tellerId: userId,
        staffId: response.staffId,
        title: response.title,
        description: response.description,
        startPlanDate: response.dateContract.format('YYYY-MM-DD'),
        devicePackages: arrString,
        contractDetails: filterDevices,
      });
    }
   
  };
  const filterRemoveHandle = (itemId) => {
    const arrRemove = newArrSmart.filter(
      (item) => item.smartDeviceId !== itemId
    );
    const newFilterDevices = filterDevices.filter(
      (item) => item.smartDeviceId !== itemId
    );
     
    setNewArrSmart(arrRemove);
    setFilterDevices(newFilterDevices);
  };
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
      <Form form={form} layout='vertical' onFinish={onSubmitCreateSurvey}>
        <div className='pr-[23px] pl-[70px] pt-[20px] -mt-[200px]'>
          <div className='grid grid-cols-[1fr] gap-[30px] items-start'>
            <div className='bg-white shadow-md'>
              <div className='px-[24px] py-[20px]'>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item
                        label='Ngày lắp đặt dự kiến'
                        name='dateContract'
                      >
                        <DatePicker
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
                      <Form.Item label='Chọn nhân viên lắp đặt' name='staffId'>
                        <Select
                          placeholder='Select installation staff'
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
                  </div>
                  <div className='w-full'>
                    <Form.Item label='Tên hợp đồng' name='title'>
                      <Input
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        required
                        placeholder='Contract name'
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
                        Sản phẩm 
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
              {newArr ? (
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
                      Số lượng
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
                          <span
                            onClick={() => decreaseQuantityPackage(index)}
                            class='btn decrease bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-l'
                          >
                            -
                          </span>
                          <input
                            type='text'
                            class='quantity-input bg-white focus:outline-none focus:ring focus:border-blue-300 border-l border-r w-16 text-center'
                            value={item?.quantity}
                          ></input>

                          <span
                            onClick={() => increaseQuantityPackage(index)}
                            class='btn increase bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-r'
                          >
                            +
                          </span>
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
                          <div className='flex flex-col items-center'>
                            <span className='text-center font-poppin text-[14px] font-medium'>
                            {item?.discountAmount}%
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className='flex flex-col items-start'>
                            <span className='text-center font-poppin text-[14px] font-medium'>
                              {item?.promotions && item.promotions.length > 0
                                ? formatCurrency(
                                    calculateDiscountedPrice(
                                      item.price, item.quantity,
                                      item.promotions[0]?.discountAmount
                                    )
                                  )
                                : formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                  
                </div>
              ) : (
                ''
              )}
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
                      <th className='w-[20%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Giá
                      </th>
                      <th className='w-[20%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Giá lắp đặt
                      </th>
                      <th className='w-[15%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Tổng
                      </th>
                      <th className='w-[10%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                        Xóa
                      </th>
                    </tr>
                    {newArrSmart?.map((item, index) => (
                      <tr className='border-t border-b border-[#E9EBEC] '>
                        <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                          {/* <img
                          src={item?.images[0].url}
                          className='w-[24px] h-[24px]'
                        /> */}
                          <div className='flex flex-col'>
                            <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                              {item?.smartDevice?.name}
                            </span>
                          </div>
                        </td>
                        <td className='px-[20px]'>
                          <div class='flex items-center'>
                            <span
                              onClick={() => decreaseQuantity(index)}
                              class='btn decrease bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-l'
                            >
                              -
                            </span>
                            <input
                              type='text'
                              class='quantity-input bg-white focus:outline-none focus:ring focus:border-blue-300 border-l border-r w-16 text-center'
                              value={item?.smartDeviceQuantity}
                            ></input>

                            <span
                              onClick={() => increaseQuantity(index)}
                              class='btn increase bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-r'
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className='flex flex-col items-start'>
                            <span className='text-center font-poppin text-[14px] font-medium'>
                              {formatCurrency(
                                item?.smartDevice?.price *
                                  item?.smartDeviceQuantity
                              )}
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className=' '>
                            <span className='pl-[20px] text-center font-poppin text-[14px] font-medium'>
                              {formatCurrency(
                                item?.smartDevice?.installationPrice
                              )}
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className='flex flex-col items-start'>
                            <span className='text-center font-poppin text-[14px] font-medium'>
                              {formatCurrency((item?.smartDevice.price * item?.smartDeviceQuantity) + item?.smartDevice.installationPrice)}
                            </span>
                          </div>
                        </td>
                        <td className=''>
                          <div className='flex items-center justify-center cursor-pointer'>
                            <span className='cursor-pointer text-center font-poppin text-[14px] font-medium'>
                              <Icon
                                onClick={() =>
                                  filterRemoveHandle(item?.smartDeviceId)
                                }
                                icon='material-symbols:delete-forever-outline'
                                width='20'
                                height='20'
                                style={{ color: '#f37272' }}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                  
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
              <Button
                type='primary'
                loading={createSurveyReportLoading}
                htmlType='submit'
              >
                Tạo hợp đồng
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
