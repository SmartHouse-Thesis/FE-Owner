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
import { Button, Checkbox, Input, Select, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import promotionAPI from '../api/promotion';
import manufactureAPI from '../api/manufacture';
import devicesAPI from '../api/device';
import { formatCurrency } from '../utils/formatCurrentcy';
export function UpdateDevice() {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [devices, setDevices] = useState();
  const [listDevices, setListDevice] = useState({
    responses: [],
  });
  const [newDevices, setNewDevices] = useState();
  const [promotion, setPromotion] = useState({
    responses: [],
  });
  const [manu, setManu] = useState();
  const [newArr, setNewArr] = useState([]);
  let { id } = useParams();
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
  const { isPending: deviceItemLoading, mutate: mutateDeviceById } =
    useMutation({
      mutationFn: () => devicesAPI.getSmartDeviceById(id),
      onSuccess: (response) => {
        setNewDevices(response);
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

  useEffect(() => {
    if (id) {
      mutateDeviceById(id);
      mutate();
    }
  }, [id]);
  const handleChange = (value) => {
    const updatedArr = [...newArr];
    for (let i = 0; i <= listDevices.data.length; i++) {
      if (listDevices?.data[i]?.id == value) {
        updatedArr.push(listDevices.data[i]);
      }
    }
    setNewArr(updatedArr);
  };
  // function handleAcceptedFiles(files) {
  //   files.map((file) =>
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //       formattedSize: formatBytes(file.size),
  //     })
  //   );
  //   setselectedFiles(files);
    
  // }
  return (
    <>
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
            <Spin tip='Loading...' spinning={deviceItemLoading}>
              <div className='px-[24px] py-[20px]'>
                <form action=''>
                  <div className='flex items-center mb-[15px] gap-[24px]'>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <label
                          className='font-poppin font-medium text-[13px]'
                          htmlFor=''
                        >
                          Tên sản phẩm
                        </label>
                      </div>
                      <div className='w-full'>
                        <input
                        disabled
                          value={newDevices?.name}
                          type='text'
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <label
                          className='font-poppin font-medium text-[13px]'
                          htmlFor=''
                        >
                          Nhà sản xuất
                        </label>
                      </div>
                      <div className='w-full'>
                        {/* <Select
                        className=''
                        defaultValue={manu[0]?.value}
                        style={{
                          width: '100%',
                        }}
                        options={manu}
                      /> */}
                        <input
                        disabled
                          // value={newDevices?.price}
                          type='text'
                          value={newDevices?.manufacturer.name}
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        />
                        {/* <Select
                          className=''
                          placeholder='Chọn nhà sản xuất'
                          style={{
                            width: '100%',
                          }}
                          value={newDevices?.manufacturer.name}
                          open={open}
                          onDropdownVisibleChange={(visible) =>
                            setOpen(visible)
                          }
                          dropdownRender={(menu) => <div>{menu}</div>}
                        >
                          {manu?.map((item) => (
                            <Option value={item.id}>{item.label}</Option>
                          ))}
                        </Select> */}
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
                          Giá tiền (vnd)
                        </label>
                      </div>
                      <div className='w-full'>
                        <input
                        disabled
                          value={newDevices?.price}
                          type='text'
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='mb-[8px]'>
                        <label
                          className='font-poppin font-medium text-[13px]'
                          htmlFor=''
                        >
                          Giá lắp đặt (vnd)
                        </label>
                      </div>
                      <div className='w-full'>
                        <input
                        disabled
                          type='text'
                          value={newDevices?.installationPrice}
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        />
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
                          Mô tả
                        </label>
                      </div>
                      <div className='w-full'>
                        <textarea
                        disabled
                          value={newDevices?.description}
                          rows={8}
                          type='text'
                          placeholder=''
                          className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mb-[8px]'>
                    <label
                      className='font-poppin font-medium text-[13px]'
                      htmlFor=''
                    >
                      Ảnh sản phẩm
                    </label>
                  </div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className='dropzone dz-clickable'>
                        <div
                          className='dz-message needsclick'
                          // {...getRootProps()}
                        >
                          <div className='flex items-center justify-center flex-col border p-[20px]'>
                            <div className='flex gap-[20px]'>
                            {newDevices?.images.map((item) => (
                                <img src={item.url} alt="" className='w-[150px] h-[150px]' />
                            ))}
                            </div>
                            {/* <h4 className='mt-[20px]'>Thêm ảnh</h4> */}
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </form>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
}
