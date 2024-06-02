import { Icon } from '@iconify/react';
import productImg from '../../public/image/clother.png';
import user from '../../public/image/user.png';
import { Pagination } from '../components/Pagination';
import { BreadCrumb } from '../components/BreadCrumb';
import { SearchInput } from '../components/SearchInput';
import { Link, NavLink, Outlet } from 'react-router-dom';

export function ConstructionPage() {
  return (
    <>
      <BreadCrumb />
      <div className='px-[24px] pt-[24px]'>
        <div className='bg-[white]  pt-[13px] pb-[16px] '>
          {/* <div className='flex items-center justify-between mx-[20px] mb-[20px] '>
            <Link to="/construction/create-contract" className='flex items-center justify-between bg-[#0AB39C] w-[180px] px-[15px] py-[10px] rounded-[4px]'>
              <Icon icon='ic:baseline-plus' style={{ color: 'white' }} />
              <button className='text-white font-poppin font-normal text-[13px]'>
                Tạo hợp đồng mới
              </button>
            </Link>
            <SearchInput />
          </div> */}
          <div className='flex items-center justify-between px-[14px] '>
            <span className='text-[#495057] font-poppin font-medium text-[16px]'>
              Danh sách hợp đồng
            </span>
          </div>
          <div className='mb-[15px] border-b border-[#E9EBEC] flex items-center justify-start'>

            <Link to='/construction' className='py-[16px] px-[20px]'>
              <span className='text-[#405189] font-poppin font-medium text-[13px]'>
                {' '}
                Hợp đồng mới{' '}
              </span>
            </Link>
            <Link to='/construction/deposit' className='py-[16px] px-[20px]'>
              <span className='text-[#405189] font-poppin font-medium text-[13px]'>
                {' '}
                Hợp đồng đã đặt cọc
              </span>
            </Link>
            <Link to='/construction/doing' className='py-[16px] px-[20px]'>
              <span className='text-[#405189] font-poppin font-medium text-[13px]'>
                {' '}
                Hợp đồng đang thi công
              </span>
            </Link>
            <Link
              to='/construction/project-done'
              className='py-[16px] px-[20px]'
            >
              <span className='text-[#405189] font-poppin font-medium text-[13px]'>
                {' '}
                Hợp đồng đã hoàn thành
              </span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
