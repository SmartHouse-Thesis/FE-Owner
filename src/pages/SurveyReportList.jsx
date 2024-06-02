import { Icon } from '@iconify/react';
import productImg from '../../public/image/clother.png';
import user from '../../public/image/user.png';
import { Pagination } from '../components/Pagination';
import { BreadCrumb } from '../components/BreadCrumb';
import { SearchInput } from '../components/SearchInput';

import { Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import packageAPI from '../api/package';
import contractAPI from '../api/contract';
import { Link } from 'react-router-dom';
import surveyReport from '../api/survey-report';
import dayjs from 'dayjs';

export function SurveyReportList() {
  const [messageApi, contextHolder] = message.useMessage();
  const [contract, setContract] = useState({
    responses: [],
  });
  const { isPending: contractLoading, mutate } = useMutation({
    mutationFn: () => surveyReport.getSurveyReport(),
    onSuccess: (response) => {
      setContract(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get products list',
      });
    },
  });
  useEffect(() => {
    mutate();
  }, []);

  return (
    <>
      <div className='px-[24px] '>
        <Spin tip='Loading...' spinning={contractLoading}>
          <div className='bg-[white]  pt-[13px] pb-[16px] '>
            <table className='w-full'>
              <tr className=''>
                <th className='w-[10%] pl-[20px] text-start font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Mã khảo sát
                </th>
                <th className='w-[20%] pl-[20px] text-center font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Mô tả
                </th>

                <th className='w-[10%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Diện tích phòng
                </th>
                <th className='w-[10%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Tên khách hàng
                </th>
                <th className='w-[15%] pl-[20px] text-center  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Số điện thoại
                </th>
                <th className='w-[10%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Ngày tạo
                </th>
                <th className='w-[10%] pl-[20px] text-start  font-poppin font-semibold text-[13px] text-[#9599AD]'>
                  Tạo hợp đồng
                </th>
              </tr>

              {contract?.data?.map((item) => (
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='gap-[8px] pl-[14px] py-[12px] flex  items-center '>
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057] '>
                        {item.id}
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className='flex justify-center'>
                      <span className='inline-block font-poppin text-[14px] font-medium '>
                        {item.description}
                      </span>
                    </div>
                  </td>

                  <td className=''>
                    <div className='flex flex-col items-center'>
                      <span className='text-center font-poppin text-[14px] font-medium'>
                        {item.roomArea}
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className='text-center'>
                      <span className='text-center font-poppin text-[14px] font-medium'>
                        {item.surveyRequest.customer.fullName}
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className='text-center'>
                      <span className='text-center font-poppin text-[14px] font-medium'>
                        {item.surveyRequest.customer.phoneNumber}
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className=' '>
                      <span className='pl-[20px] text-center font-poppin text-[14px] font-medium'>
                      {dayjs(item.createAt).format('DD-MM-YYYY')}
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className=' '>
                      <Link
                        to='/survey/create-contract'
                        className='font-poppin text-[13px] font-normal text-emerald-800 inline-block py-[10px] px-[20px] bg-green-500'
                      >
                        Tạo hợp đồng
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </table>

            <Pagination />
          </div>
        </Spin>
      </div>
    </>
  );
}
{
  /* <td className='px-[21px]'>
<div className='flex flex-col items-start'>
  <span className='font-poppin text-[14px] font-medium'>
    {item.price}
  </span>
  <Link to="/invoices" className='font-poppin text-[13px] font-normal text-red-600 inline-block py-[10px] px-[20px] '>
    Xem chi tiết
  </Link>
</div>
</td> */
}
