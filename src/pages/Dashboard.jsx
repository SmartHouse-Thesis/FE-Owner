import { Icon } from '@iconify/react';
import productImg from '../../public/image/clother.png';
import user from '../../public/image/user.png';
import { Pagination } from '../components/Pagination';
import { BreadCrumb } from '../components/BreadCrumb';
export function Dashboard() {
  return (
    <>
        <BreadCrumb/>
      <div className='py-[24px] px-[24px]'>
        <div className='flex items-center justify-between'>
          <div className='mb-[21px]'>
            <span className='font-poppin font-medium text-[16px] '>
              Good Morning, Anna!
            </span>
            <p className='font-poppin font-normal text-[13px]'>
              Here's what's happening with your store today.
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-[24px] mb-[24px]'>
          <div className='pt-[11px] pb-[15px] pl-[14px] pr-[16px] flex-1 bg-white'>
            <div className='flex items-center justify-between  mb-[24px]'>
              <span className='inline-block font-poppin font-medium text-[13px] text-[#9599AD] uppercase'>
                Total Earnings
              </span>
              <span className='inline-block font-poppin font-medium text-[14px] text-[#0AB39C]'>
                +16.24 %
              </span>
            </div>
            <span className='inline-block font-hk font-semibold text-[22px] text-[#495057]'>
              $559.25K
            </span>
            <div className='flex items-end justify-between'>
              <a
                href='#'
                className='underline text-[13px] font-normal font-poppin'
              >
                View net earnings
              </a>
              <div className='bg-lime-300 p-[20px]'>
                <Icon
                  icon='ant-design:dollar-outlined'
                  style={{ color: '#0AB39C' }}
                  className=' w-[22px] h-[22px]'
                />
              </div>
            </div>
          </div>
          <div className='pt-[11px] pb-[15px] pl-[14px] pr-[16px] flex-1  bg-white'>
            <div className='flex items-center justify-between  mb-[24px]'>
              <span className='inline-block font-poppin font-medium text-[13px] text-[#9599AD] uppercase'>
                ORDERS
              </span>
              <span className='inline-block font-poppin font-medium text-[14px] text-[#F06548]'>
                -3.57 %
              </span>
            </div>
            <span className='inline-block font-hk font-semibold text-[22px] text-[#495057]'>
              31,642
            </span>
            <div className='flex items-end justify-between'>
              <a
                href='#'
                className='underline text-[13px] font-normal font-poppin'
              >
                View all orders
              </a>
              <div className='bg-cyan-300 p-[20px]'>
                <Icon
                  icon='ant-design:shopping-outlined'
                  style={{ color: '#299CDB' }}
                  className=' w-[22px] h-[22px]'
                />
              </div>
            </div>
          </div>
          <div className='pt-[11px] pb-[15px] pl-[14px] pr-[16px] flex-1 bg-white'>
            <div className='flex items-center justify-between  mb-[24px]'>
              <span className='inline-block font-poppin font-medium text-[13px] text-[#9599AD] uppercase'>
                CUSTOMERS
              </span>
              <span className='inline-block font-poppin font-medium text-[14px] text-[#F06548]'>
                -3.57 %
              </span>
            </div>
            <span className='inline-block font-hk font-semibold text-[22px] text-[#495057]'>
              $183.33M
            </span>
            <div className='flex items-end justify-between'>
              <a
                href='#'
                className='underline text-[13px] font-normal font-poppin'
              >
                See details
              </a>
              <div className='bg-amber-200 p-[20px]'>
                <Icon
                  icon='mingcute:user-4-line'
                  style={{ color: '#F7B84B' }}
                  className=' w-[22px] h-[22px]'
                />
              </div>
            </div>
          </div>
          <div className='pt-[11px] pb-[15px] pl-[14px] pr-[16px] flex-1 bg-white'>
            <div className='flex items-center justify-between  mb-[24px]'>
              <span className='inline-block font-poppin font-medium text-[13px] text-[#9599AD] uppercase'>
                MY BALANCE
              </span>
              <span className='inline-block font-poppin font-medium text-[14px] text-[#0AB39C]'>
                +16.24 %
              </span>
            </div>
            <span className='inline-block font-hk font-semibold text-[22px] text-[#495057]'>
              $165.89K
            </span>
            <div className='flex items-end justify-between'>
              <a
                href='#'
                className='underline text-[13px] font-normal font-poppin'
              >
                Withdraw money
              </a>
              <div className='bg-slate-300 p-[20px]'>
                <Icon
                  icon='ph:wallet-bold'
                  style={{ color: '#405189' }}
                  className=' w-[22px] h-[22px]'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[24px]'>
          <div className='flex flex-1'>
            <div className='bg-[white]  pt-[13px] pb-[16px] '>
              <div className='flex items-center justify-between px-[14px] mb-[15px]'>
                <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                  Best Selling Products
                </span>
                <div>
                  <span className='font-poppin font-semibold text-[12px] text-[#212529] uppercase'>
                    Sort by:
                  </span>
                  <span className='font-poppin font-normal text-[13px] text-[#9599AD]'>
                    Today
                  </span>
                </div>
              </div>
              <table>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              <Pagination/>
            </div>
            
          </div>
          <div className='flex flex-1'>
            <div className='bg-[white] pt-[13px] pb-[16px] '>
              <div className='flex items-center justify-between px-[14px] mb-[15px]'>
                <span className='text-[#495057] font-poppin font-medium text-[16px]'>
                  Best Selling Products
                </span>
                <div>
                  <span className='font-poppin font-semibold text-[12px] text-[#212529] uppercase'>
                    Sort by:
                  </span>
                  <span className='font-poppin font-normal text-[13px] text-[#9599AD]'>
                    Today
                  </span>
                </div>
              </div>
              <table>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className='border-t border-b border-[#E9EBEC] '>
                  <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                    <img src={productImg} />
                    <div className='flex flex-col'>
                      <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                        Branded T-Shirts
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Branded T-Shirts
                      </span>
                    </div>
                  </td>
                  <td className=''>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $29.00
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Price
                      </span>
                    </div>
                  </td>
                  <td className='pr-[36px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        62
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Orders
                      </span>
                    </div>
                  </td>
                  <td className='pr-[87px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        510
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Stock
                      </span>
                    </div>
                  </td>
                  <td className='pr-[41px]'>
                    <div className='flex flex-col items-start'>
                      <span className='font-poppin text-[14px] font-medium'>
                        $1,798
                      </span>
                      <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                        Tổng số
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              <Pagination/>
            </div>
            
          </div>
        </div>
      </div>
      <div className='px-[24px] flex'>
        <div className='bg-[white] pt-[13px] pb-[16px] '>
          <div className='flex items-center justify-between px-[14px] mb-[15px]'>
            <span className='text-[#495057] font-poppin font-medium text-[16px]'>
              Recent Orders
            </span>
            <div>
              <span className='font-poppin font-semibold text-[12px] text-[#212529] uppercase'>
                Sort by:
              </span>
              <span className='font-poppin font-normal text-[13px] text-[#9599AD]'>
                Today
              </span>
            </div>
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
                Product
              </th>
              <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                Tổng số
              </th>
              <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                Vendor
              </th>
              <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                Status
              </th>
              <th className='font-poppin font-semibold text-[13px] text-[#9599AD]'>
                Rating
              </th>
            </tr>
            <tr className='border-t border-b border-[#E9EBEC]'>
              <td className='pl-[17px] pr-[20px]'>
                <div className='flex items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    #VZ2112
                  </span>
                </div>
              </td>
              <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                <img src={user} />
                <div className='flex flex-col'>
                  <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                    Alex Smith
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    Bags and Wallets
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'></span>
                </div>
              </td>
              <td className='pr-[36px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    $109.00
                  </span>
                </div>
              </td>
              <td className='pr-[87px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    510
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                    Stock
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium text-[#0AB39C] inline-block  '>
                    Paid
                  </span>
  
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    5.0
                  </span>
                </div>
              </td>
            </tr>
            <tr className='border-t border-b border-[#E9EBEC] '>
              <td className='pl-[17px] pr-[20px]'>
                <div className='flex items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    #VZ2112
                  </span>
                </div>
              </td>
              <td className='flex gap-[8px] pl-[14px] py-[12px] items-center'>
                <img src={user} />
                <div className='flex flex-col'>
                  <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                    Alex Smith
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    Bike Accessories
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'></span>
                </div>
              </td>
              <td className='pr-[36px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    $109.00
                  </span>
                </div>
              </td>
              <td className='pr-[87px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    510
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                    Stock
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium text-[#0AB39C] inline-block '>
                    Paid
                  </span>

                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    5.0
                  </span>
                </div>
              </td>
            </tr>
            <tr className='border-t border-b border-[#E9EBEC] '>
              <td className='pl-[17px] pr-[20px]'>
                <div className='flex items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    #VZ2112
                  </span>
                </div>
              </td>
              <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                <img src={user} />
                <div className='flex flex-col'>
                  <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                    Alex Smith
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    Bike Accessories
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'></span>
                </div>
              </td>
              <td className='pr-[36px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    $109.00
                  </span>
                </div>
              </td>
              <td className='pr-[87px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    510
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                    Stock
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium text-[#0AB39C] inline-block '>
                    Paid
                  </span>
  
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    5.0
                  </span>
                </div>
              </td>
            </tr>
            <tr className='border-t border-b border-[#E9EBEC] '>
              <td className='pl-[17px] pr-[20px]'>
                <div className='flex items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    #VZ2112
                  </span>
                </div>
              </td>
              <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                <img src={user} />
                <div className='flex flex-col'>
                  <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                    Alex Smith
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    Kitchen Storage
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'></span>
                </div>
              </td>
              <td className='pr-[36px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    $109.00
                  </span>
                </div>
              </td>
              <td className='pr-[87px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    510
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                    Stock
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium text-[#0AB39C] inline-block '>
                    Paid
                  </span>

                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    5.0
                  </span>
                </div>
              </td>
            </tr>
            <tr className='border-t border-b border-[#E9EBEC] '>
              <td className='pl-[17px] pr-[20px]'>
                <div className='flex items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    #VZ2112
                  </span>
                </div>
              </td>
              <td className='pr-[81px] flex gap-[8px] pl-[14px] py-[12px] items-center'>
                <img src={user} />
                <div className='flex flex-col'>
                  <span className='font-poppin text-[14px] font-medium text-[#495057]'>
                    Alex Smith
                  </span>
                </div>
              </td>
              <td className=''>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    Clothes
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'></span>
                </div>
              </td>
              <td className='pr-[36px]'>
                <div className='flex flex-col items-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    $109.00
                  </span>
                </div>
              </td>
              <td className='pr-[87px]'>
                <div className='flex flex-col items-center justify-center'>
                  <span className='font-poppin text-[14px] font-medium'>
                    510
                  </span>
                  <span className='font-poppin text-[13px] font-normal text-[#9599AD]'>
                    Stock
                  </span>
                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium text-[#0AB39C] inline-block '>
                    Paid
                  </span>

                </div>
              </td>
              <td className='pr-[41px]'>
                <div className='flex flex-col items-start'>
                  <span className='font-poppin text-[14px] font-medium'>
                    5.0
                  </span>
                </div>
              </td>
            </tr>
          </table>
          <Pagination/>
        </div>
      </div>
    </>
  );
}
