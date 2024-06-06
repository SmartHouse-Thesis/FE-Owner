import { NavLink, Outlet } from 'react-router-dom';
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
export function CreateContract() {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openManu, setOpenManu] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [devices, setDevices] = useState();
  const [idPromote, setIdPromote] = useState(0);
  const [promotionId, setPromotionId] = useState();
  const [newPromotion, setNewPromotion] = useState(0);
  const [selectedFiles, setselectedFiles] = useState();
  const [filterDevices, setFilterDevices] = useState([]);
  const [listDevices, setListDevice] = useState({
    responses: [],
  });

  const [newDevices, setNewDevices] = useState();
  const [promotion, setPromotion] = useState();
  const [manu, setManu] = useState();
  const [newArr, setNewArr] = useState([]);
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
  const { isPending: manufactureLoading, mutate: MutateManu } = useMutation({
    mutationFn: () => manufactureAPI.getManufacture(),
    onSuccess: (response) => {
      const outputArray = [];

      response?.forEach((item) => {
        outputArray.push({
          value: item.id,
          label: item.name,
          discount: item.discountAmount,
        });
      });
      setManu(outputArray);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get manufactures list',
      });
    },
  });
  const checkFileType = (files) => {
    const acceptedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
    ];
    return files.every((file) => acceptedFileTypes.includes(file.type));
  };
  const { isPending: promotionIdLoading, mutate: mutatePromotionId } =
    useMutation({
      mutationFn: () => promotionAPI.getPromotionById(idPromote),
      onSuccess: (response) => {
        setPromotionId(response);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Error occur when get manufactures list',
        });
      },
    });
  const { isPending: createDevicePackageLoading, mutate: mutateDevicePackge } =
    useMutation({
      mutationFn: (params) => packageAPI.createDevicePage(params),
      onSuccess: (response) => {
        messageApi.open({
          type: 'success',
          content: 'Tạo gói sản phẩm thành công',
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
    mutationFn: () => devicesAPI.getSmartDevice(),
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
  const onChangePromotion = (value) => {
    // console.log(value);
    setIdPromote(value);
    if (value) {
      mutatePromotionId(value);
    }
  };
  useEffect(() => {
    mutate();
    MutateManu();
    mutateDevices();
  }, []);
  const handleChange = (value) => {
    const updatedArr = [...newArr];
    let newArray = listDevices.data.map((item) => {
      return {
        ...item,
        quantity: 1,
      };
    });

    for (let i = 0; i <= newArray.length; i++) {
      if (newArray[i]?.id == value) {
        let existingItemIndex = updatedArr.findIndex(
          (item) => item.id == newArray[i].id
        );
        if (existingItemIndex != -1) {
          updatedArr[existingItemIndex].quantity++;
        } else {
          updatedArr.push(newArray[i]);
        }
      }
    }
    const filteredDevices = updatedArr.map((device) => {
      return {
        smartDeviceId: device.id,
        quantity: device.quantity,
      };
    });
    setFilterDevices(filteredDevices);
    setNewArr(updatedArr);
  };
  const totalPrice = (newArr) => {
    let totalPrice = 0;
    newArr?.map((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };
  const totalAllPrice = (newArr, discountAmount) => {
    let totalAllPrice = 0;

    newArr?.map(
      (item) =>
        (totalAllPrice +=
          item.price * item.quantity + item.quantity * item.installationPrice)
    );
    if (discountAmount) {
      totalAllPrice = totalAllPrice - totalAllPrice * (discountAmount / 100);
    }

    return totalAllPrice;
  };
  const increaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];
    // Tăng giá trị quantity của phần tử tương ứng
    newArrCopy[index].quantity += 1;
    // Cập nhật lại state của newArr với bản sao mới
    setNewArr(newArrCopy);
  };

  const decreaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];
    // Tăng giá trị quantity của phần tử tương ứng
    if (newArrCopy[index].quantity == 0) {
      newArrCopy[index].quantity = 0;
    } else {
      newArrCopy[index].quantity -= 1;
    }

    // Cập nhật lại state của newArr với bản sao mới
    setNewArr(newArrCopy);
  };
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setselectedFiles(files[0]);
    console.log(files);
  }
  const onSubmitCreateDevice = (response) => {
    console.log(response);

    const form = new FormData();
    form.append('manufacturerId', response.manuId);
    form.append('promotionId', response.promotion);
    form.append('name', response.packageName);
    form.append('warrantyDuration', response.warranty);
    form.append('description', response.description);
    form.append('completionTime', response.dateInstall);
    form.append('image', selectedFiles);
    for (const deviceId of filterDevices) {
      form.append('smartDeviceIds', deviceId);
      console.log(deviceId);
    }
    mutateDevicePackge(form);
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
      <Form layout='vertical' onFinish={onSubmitCreateDevice}>
        <div className='pr-[23px] pl-[70px] pt-[20px] -mt-[200px]'>
          <div className='grid grid-cols-[1fr] gap-[30px] items-start'>
            {/* <div className='flex flex-col gap-[30px]'>
            <div className='w-full py-[30px] rounded-[4px] flex items-center justify-center flex-col shadow-md bg-[#FFFFFF]'>
              <div className='relative max-w-[110px] mx-auto'>
                <div className='absolute -bottom-[10px] right-[10px] z-20'>
                  <input
                    className='hidden'
                    id='uploadImage'
                    type='file'
                    accept='.png, .jpg, .jpeg'
                  />
                  <label
                    for='uploadImage'
                    className='inline-block w-[32px] h-[32px] rounded-full bg-[#F3F6F9] shadow-sm cursor-pointer transition-all '
                  >
                    <Icon
                      icon='mdi:camera'
                      className='text-center absolute top-[8px] right-[8px]'
                      style={{ color: '#212529' }}
                    />
                  </label>
                </div>
                <div className='w-[120px] h-[120px] rounded-full flex items-center justify-center bg-[#F3F3F9] relative shadow-sm'>
                  <div
                    style={{
                      width: '110px',
                      height: '110px',
                      backgroundImage: `url(${profileImage})`,
                      backgroundSize: 'cover',
                    }}
                    className='w-[110px] h-[110px] rounded-full bg-cover bg-no-repeat bg-center'
                  ></div>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-poppin font-medium text-[16px]'>
                  Anna Adame
                </span>
                <span className='font-poppin font-normal text-[13px]'>
                  Lead Designer / Developer
                </span>
              </div>
            </div>
            <div className='px-[15px] py-[13px] bg-white shadow-md '>
              <div className='mb-[26px]'>
                <span className='font-poppin font-medium text-[16px] text-[#495057]'>
                  Complete Your Profile
                </span>
              </div>
              <div className='relative w-full bg-[#EFF2F7] h-[15px]'>
                <div
                  style={{ width: '50%' }}
                  className='absolute bg-[#F06548] left-[5px] top-1/2 -translate-y-1/2 h-[7px] rounded-[30px]'
                ></div>
                <div
                  style={{ right: '50%', top: '-20px' }}
                  className='absolute translate-x-1/2 z-30 bg-[#405189] text-white font-poppin font-medium text-[9px] py-[1.5px] px-[3.5px] rounded-[4px]'
                >
                  50%
                </div>
              </div>
            </div>
            <div className='px-[15px] py-[13px] bg-white shadow-md'>
              <div className='mb-[26px]'>
                <span className='font-poppin font-medium text-[16px] text-[#495057]'>
                  Portfolio
                </span>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <div className='flex items-center gap-[20px]'>
                  <img src={github} alt='' />
                  <div className='w-full'>
                    <input
                      value='@daveadame'
                      type='text'
                      placeholder=''
                      className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                    />
                  </div>
                </div>
                <div className='flex items-center gap-[20px]'>
                  <img src={github} alt='' />
                  <div className='w-full'>
                    <input
                      value='@daveadame'
                      type='text'
                      placeholder=''
                      className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                    />
                  </div>
                </div>
                <div className='flex items-center gap-[20px]'>
                  <img src={github} alt='' />
                  <div className='w-full'>
                    <input
                      value='@daveadame'
                      type='text'
                      placeholder=''
                      className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            <div className='bg-white shadow-md'>
              <div className='px-[24px] py-[20px]'>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <Form.Item label='Nhập tên hợp đồng' name='packageName'>
                        <Input
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                          required
                          placeholder='Contract name'
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <Form.Item label='Chọn ngày dự kiến' name='dateReport'>
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
                      Gói sản phẩm
                      </label>
                    </div>
                    <div className='w-full'>
                      <Select
                        showSearch
                        className=''
                        style={{
                          width: '100%',
                        }}
                        // value={undefined}
                        placeholder='Select product of manufacture'
                        // open={openProduct}
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        // onChange={handleChange}
                        // options={devices}
                        // onDropdownVisibleChange={(visible) =>
                        //   setOpenProduct(visible)
                        // }
                        dropdownRender={(menu) => <div>{menu}</div>}
                      >
                        {/* {devices?.map((item) => (
                          <Option value={item.value}>{item.label}</Option>
                        ))} */}
                      </Select>
                    </div>
                  </div>
                </div>
                {/* <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Gói sản phẩm (của hãng)
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
                        placeholder='Vui lòng chọn sản phẩm của hãng'
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
                </div> */}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_480px] items-start mt-[20px] gap-[30px]'>
            <div className='px-[24px] pt-[24px]'>
              <div className='bg-[white]  pt-[13px] pb-[16px] shadow-md'>
                <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
                  {/* <SearchInput /> */}
                </div>
                <table>
                  <tr className=''>
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
                  </tr>
                  {newArr?.map((item, index) => (
                    <tr className='border-t border-b border-[#E9EBEC] '>
                      <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                        <img
                          src={item.images[0].url}
                          className='w-[24px] h-[24px]'
                        />
                        <div className='flex flex-col'>
                          <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className=''>
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
                            value={item?.quantity}
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
                            {formatCurrency(item.price * item?.quantity)}
                          </span>
                        </div>
                      </td>
                      <td className=''>
                        <div className=' '>
                          <span className='pl-[20px] text-center font-poppin text-[14px] font-medium'>
                            {formatCurrency(item.installationPrice)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {newArr?.map((item, index) => (
                    <tr className='border-t border-b border-[#E9EBEC] '>
                      <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                        <img
                          src={item.images[0].url}
                          className='w-[24px] h-[24px]'
                        />
                        <div className='flex flex-col'>
                          <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className=''>
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
                            value={item?.quantity}
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
                            {formatCurrency(item.price * item?.quantity)}
                          </span>
                        </div>
                      </td>
                      <td className=''>
                        <div className=' '>
                          <span className='pl-[20px] text-center font-poppin text-[14px] font-medium'>
                            {formatCurrency(item.installationPrice)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
                <Pagination />
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
                    {formatCurrency(totalPrice(newArr))}
                  </span>
                </div>
                <br></br>
                <div className='flex items-center justify-between'>
                  <span className='inline-block font-poppin font-normal text-[16px]'>
                    Chiết khấu
                  </span>
                  <span className='inline-block font-poppin font-normal text-[16px]'>
                    {promotionId?.discountAmount}%
                  </span>
                </div>
              </div>
              <div className='flex items-center justify-between mt-[20px]'>
                <span className='inline-block font-poppin font-normal text-[16px] mb-[15px]'>
                  Tổng
                </span>
                <span className='inline-block font-poppin font-normal text-red-500 text-[16px] mb-[15px]'>
                  {formatCurrency(
                    totalAllPrice(newArr, promotionId?.discountAmount)
                  )}
                </span>
              </div>
              <Button type='primary' htmlType='submit'>
                Tạo gói sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
