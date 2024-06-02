import { NavLink, Outlet, useParams } from 'react-router-dom';
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
import { Button, Checkbox, Form, Input, Select, Spin, message } from 'antd';
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
export function UpdatePackage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
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
  let { id } = useParams();

  const [listDevices, setListDevice] = useState({
    responses: [],
  });

  const [newPackage, setNewPackage] = useState();
  const [promotion, setPromotion] = useState();
  const [manu, setManu] = useState();
  const [newArr, setNewArr] = useState([]);
  const [devicePackageId, setDevicePackageId] = useState();
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
  const { isPending: contractLoading, mutate: mutatePromotion } = useMutation({
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

  const { isPending: deviceItemLoading, mutate: mutateDeviceById } =
    useMutation({
      mutationFn: () => packageAPI.getPackageDevicesById(id),
      onSuccess: (response) => {
        setNewPackage(response);
        console.log(response);
        const newPromotionList = [];
        const newfilterPromotion = response.promotions.map((item) => {
          newPromotionList.push(item.name);
        });
        setNewArr(response?.smartDevicePackages);
        form.setFieldsValue({
          name: response?.name,
          completionTime: response?.completionTime,
          manufacture: response?.manufacturer.name,
          price: response?.price,
          promotion: newPromotionList,
          warrantyDuration: response?.warrantyDuration,
          description: response?.description,
          images: response?.images[0].id,
          //   smartDevice: response.smartDevicePackages,
          status: 'Active',
        });
      },
      onError: (response) => {
        console.log(response);
        messageApi.open({
          type: 'error',
          content: 'Error occur when get package list',
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
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    },
  });
  const { isPending: updateDevicePackageLoading, mutate: mutateUpdate } =
    useMutation({
      mutationFn: (params) =>
        packageAPI.updateDevicePackage(params, devicePackageId),
      onSuccess: (response) => {
        messageApi.open({
          type: 'success',
          content: 'Cập nhật thiết bị thành công',
        });
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: error.response.data.message,
        });
      },
    });
  useEffect(() => {
    if (id) {
      setDevicePackageId(id);
      MutateManu();
      mutatePromotion();
      mutateDevices();
      mutateDeviceById(id);
    }
  }, [id]);
  const handleChange = (value) => {
    // console.log(value)
    // console.log(newArr);
    const updatedArr = [...newArr];
    let newArray = listDevices.data.map((item) => {
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
    console.log(updatedArr);
    const filteredDevices = updatedArr.map((device) => {
      return {
        smartDeviceId: device.smartDevice.id,
        quantity: device.smartDeviceQuantity,
      };
    });
    console.log(filteredDevices);
    setFilterDevices(filteredDevices);
    setNewArr(updatedArr);
  };
  const totalPrice = (newArr) => {
    let totalPrice = 0;

    newArr?.map(
      (item) =>
        (totalPrice += item?.smartDevice.price * item?.smartDeviceQuantity)
    );
    return totalPrice;
  };
  const totalAllPrice = (newArr, discountAmount) => {
    let totalAllPrice = 0;

    newArr?.map(
      (item) =>
        (totalAllPrice +=
          item?.smartDevice.price * item?.smartDeviceQuantity +
          item.smartDevice.installationPrice)
    );
    console.log(totalAllPrice);
    if (discountAmount) {
      totalAllPrice = totalAllPrice - totalAllPrice * (discountAmount / 100);
    }

    return totalAllPrice;
  };
  const increaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];

    // Tăng giá trị quantity của phần tử tương ứng
    newArrCopy[index].smartDeviceQuantity += 1;

    // Cập nhật lại state của newArr với bản sao mới
    setNewArr(newArrCopy);
  };

  const decreaseQuantity = (index) => {
    // Tạo một bản sao mới của mảng newArr
    const newArrCopy = [...newArr];
    // Tăng giá trị quantity của phần tử tương ứng
    if (newArrCopy[index].quantity == 0) {
      newArrCopy[index].smartDeviceQuantity = 0;
    } else {
      newArrCopy[index].smartDeviceQuantity -= 1;
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
  const onChangePromotion = (value) => {
    // console.log(value);
    setIdPromote(value);
    if (value) {
      mutatePromotionId(value);
    }
  };
  const onSubmitCreateDevice = (response) => {
    // console.log(response);
    // console.log(filterDevices);

    const form = new FormData();
    form.append('manufacturerId', response?.manufacture);
    form.append('promotionId', response?.promotion);
    form.append('name', response?.name);
    form.append('warrantyDuration', response?.warrantyDuration);
    form.append('description', response?.description);
    form.append('completionTime', response?.completionTime);
    form.append('image', selectedFiles);
    form.append('smartDevideIds', filterDevices);
    mutateUpdate(form);

    // const form = new FormData();
    // form.append('manufacturerId', response.manuId);
    // form.append('promotionId', response.promotion);
    // form.append('name', response.packageName);
    // form.append('warrantyDuration', response.warranty);
    // form.append('description', response.description);
    // form.append('completionTime', response.dateInstall);
    // form.append('image', selectedFiles);
    // form.append('smartDevideIds', filterDevices);
    // mutateDevicePackge(form);
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
      <Spin tip='Loading...' spinning={deviceItemLoading}>
        <Form form={form} layout='vertical' onFinish={onSubmitCreateDevice}>
          <div className='pr-[23px] pl-[70px] pt-[20px] -mt-[200px]'>
            <div className='grid grid-cols-[1fr] gap-[30px] items-start'>
              <div className='bg-white shadow-md'>
                <div className='px-[24px] py-[20px]'>
                  <div className='flex items-center mb-[15px] gap-[24px]'>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <Form.Item label='Tên gói' name='name'>
                          <Input
                            disabled
                            className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                            required
                            placeholder='Input package name'
                            defaultValue={newPackage?.name}
                          ></Input>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <Form.Item
                          label='Số ngày hoàn thành'
                          name='completionTime'
                        >
                          <Input
                            disabled
                            className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                            required
                            placeholder='Input package name'
                          ></Input>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='w-full'>
                        {/* <Select
                        className=''
                        defaultValue={manu[0]?.value}
                        style={{
                          width: '100%',
                        }}
                        options={manu}
                      /> */}
                        <Form.Item label='Hãng' name='manufacture'>
                          <Select
                            disabled
                            placeholder='Select manufacture'
                            style={{
                              width: '100%',
                            }}
                            open={openManu}
                            value={newPackage?.manufacturer.name}
                            onDropdownVisibleChange={(visible) =>
                              setOpenManu(visible)
                            }
                          >
                            {manu?.map((item, index) => (
                              <Option value={item.value} key={index}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center mb-[15px] gap-[24px]'>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <Form.Item label='Chiết khấu' name='promotion'>
                          <Select
                            mode='multiple'
                            disabled
                            placeholder=''
                            style={{
                              width: '100%',
                            }}
                            open={openPromotion}
                            onDropdownVisibleChange={(visible) =>
                              setOpenPromotion(visible)
                            }
                            value={newPackage?.promotion?.name}
                            onChange={onChangePromotion}
                          >
                            {promotion?.map((item, index) => (
                              <Option value={item.value} key={index}>
                                {item.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className='w-full'>
                      <Form.Item
                        label='Thời hạn bảo hành (tháng)'
                        name='warrantyDuration'
                      >
                        <Input
                          disabled
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                          required
                          placeholder='Input product warranty (month)'
                        ></Input>
                      </Form.Item>
                    </div>
                  </div>
                  <div className='flex items-center mb-[15px] gap-[24px]'>
                    <div className='w-full'>
                      <Form.Item label='Nhập mô tả' name='description'>
                        <TextArea
                          disabled
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                          required
                          placeholder='Input description'
                          rows={8}
                        ></TextArea>
                      </Form.Item>
                    </div>
                  </div>
                  <div className='mb-[8px]'>
                    <label
                      className='font-poppin font-medium text-[13px]'
                      htmlFor=''
                    >
                      Ảnh
                    </label>
                  </div>

                      <div className='dropzone dz-clickable'>
                        <div
                          className='dz-message needsclick'
                        >
                          <div className='flex items-center justify-center flex-col border p-[20px]'>
                            {newPackage?.images[0].url ? (
                              <img
                                src={newPackage?.images[0].url}
                                alt=''
                                className='w-[200px] h-[200px]'
                              />
                            ) : (
                              <Icon
                                icon='mdi:cloud-upload'
                                className='w-[100px] h-[100px]'
                                style={{ color: '#212529' }}
                              />
                            )}

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

                            <input
                              type='text'
                              disabled
                              class='quantity-input bg-white focus:outline-none focus:ring focus:border-blue-300 border-l border-r w-16 text-center'
                              value={item?.smartDeviceQuantity}
                            ></input>

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
                      </tr>
                    ))}
                  </table>
                  <Pagination />
                </div>
              </div>
              <div className='py-[20px] px-[20px] shadow-md'>
                <div className='flex items-center justify-between mb-[20px]'>
                  <span className='font-poppin font-medium text-[16px]'>
                    Giá
                  </span>
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
                {/* <Button
                  type='primary'
                  htmlType='submit'
                  loading={updateDevicePackageLoading}
                >
                 Cập nhật gói sản phẩm
                </Button> */}
              </div>
            </div>
          </div>
        </Form>
      </Spin>
    </>
  );
}
