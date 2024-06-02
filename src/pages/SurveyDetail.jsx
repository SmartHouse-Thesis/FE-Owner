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
import { Checkbox, Select } from 'antd';
export function SurveyDetail() {
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }
  const productArray = [
    {
      productName: 'Branded T-Shirt',
      price: '$29.00',
      order: '62',
      amount: '510',
      status: 'Paid',
      published: '06 Jan, 2021, 01:31 PM',
    },
    {
      productName: 'Branded T-Shirt',
      price: '$29.00',
      order: '62',
      amount: '510',
      status: 'Paid',
      published: '06 Jan, 2021, 01:31 PM',
    },
    {
      productName: 'Branded T-Shirt',
      price: '$29.00',
      order: '62',
      amount: '510',
      status: 'Paid',
      published: '06 Jan, 2021, 01:31 PM',
    },
    {
      productName: 'Branded T-Shirt',
      price: '$29.00',
      order: '62',
      amount: '510',
      status: 'Paid',
      published: '06 Jan, 2021, 01:31 PM',
    },
    {
      productName: 'Branded T-Shirt',
      price: '$29.00',
      order: '62',
      amount: '510',
      status: 'Paid',
      published: '06 Jan, 2021, 01:31 PM',
    },
  ];
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
            <div className='px-[24px] py-[20px]'>
              <form action=''>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Tên khách hàng
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder='Customer name'
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
                        Nhân viên khảo sát
                      </label>
                    </div>
                    <div className='w-full'>
                      <Select
                        defaultValue='lucy'
                        style={{
                          width: '100%',
                        }}
        
                        options={[
                          {
                            value: 'jack',
                            label: 'Jack',
                          },
                          {
                            value: 'lucy',
                            label: 'Lucy',
                          },
                          {
                            value: 'Yiminghe',
                            label: 'yiminghe',
                          },
                          {
                            value: 'disabled',
                            label: 'Disabled',
                            disabled: true,
                          },
                        ]}
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
                        Diện tích phòng
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder='Room Area'
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
                        Mô tả
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='number'
                        placeholder='Room description'
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
                        Sản phẩm gợi ý
                      </label>
                    </div>
                    <div className='w-full'>
                      <Select
                        style={{ height: 100 }}
                        type='text'
                        placeholder='Select product'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-[1fr_480px] items-start mt-[20px] gap-[30px]'>
          <div>
            <div className='px-[24px] pt-[24px]'>
              <div className='bg-[white]  pt-[13px] pb-[16px] shadow-md'>
                <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
                  <SearchInput />
                  <button className='rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#3fc055]'>
                    Xác nhận
                  </button>
                </div>
                <div className='flex items-center justify-between px-[14px] mb-[15px]'>
                  <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                    Gói sản phẩm
                  </span>
                </div>
                <table>
                  <tr>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Order ID
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Khách hàng
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Quantity
                    </th>

                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Tổng số
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Date order
                    </th>
                  </tr>
                  {productArray.map((item) => (
                    <tr className='border-t border-b border-[#E9EBEC] '>
                      <td className='px-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                        <Checkbox></Checkbox>
                        <img src={productImg} />
                        <div className='flex flex-col'>
                          <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                            {item.productName}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Branded T-Shirts
                          </span>
                        </div>
                      </td>
                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            {item.price}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Price
                          </span>
                        </div>
                      </td>
                      <td className='px-[26px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            {item.order}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Orders
                          </span>
                        </div>
                      </td>

                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            0 USD
                          </span>
                        </div>
                      </td>
                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            January 21st, 2024
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
                <Pagination />
              </div>
            </div>
            <div className='px-[24px] pt-[24px]'>
              <div className='bg-[white]  pt-[13px] pb-[16px] shadow-md'>
                <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
                  <SearchInput />
                  <button className='rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#3fc055]'>
                    Xác nhận
                  </button>
                </div>

                <div className='flex items-center justify-between px-[14px] mb-[15px]'>
                  <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                    Sản phẩm
                  </span>
                </div>
                <table>
                  <tr>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Order ID
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Khách hàng
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Quantity
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Tổng số
                    </th>
                    <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                      Date order
                    </th>
                  </tr>
                  {productArray.map((item) => (
                    <tr className='border-t border-b border-[#E9EBEC] '>
                      <td className='px-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                        <Checkbox></Checkbox>
                        <img src={productImg} />
                        <div className='flex flex-col'>
                          <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                            {item.productName}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Branded T-Shirts
                          </span>
                        </div>
                      </td>
                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            {item.price}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Price
                          </span>
                        </div>
                      </td>
                      <td className='px-[26px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            {item.order}
                          </span>
                          <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                            Orders
                          </span>
                        </div>
                      </td>

                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            0 USD
                          </span>
                        </div>
                      </td>
                      <td className='px-[21px]'>
                        <div className='flex flex-col items-start'>
                          <span className='font-poppin text-[14px] font-medium'>
                            January 21st, 2024
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
        </div>
      </div>
    </>
  );
}
