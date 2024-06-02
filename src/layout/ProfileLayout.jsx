import { NavLink, Outlet } from 'react-router-dom';
import profileImage from '../../public/image/profile.jpeg';
import overlay from '../../public/image/overlayprofile.png';
import github from '../../public/image/github-icon.png';
import { Icon } from '@iconify/react';

export function ProfileLayout() {
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
      <div className='pr-[23px] pl-[70px] pt-[20px] -mt-[100px]'>
        <div className='grid grid-cols-[387px_1fr] gap-[30px] items-start'>
          <div className='flex flex-col gap-[30px]'>
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
          </div>
          <div className='bg-white shadow-md'>
            <div className='flex border-b border-[#E9EBEC]'>
              <NavLink
                to='/profile'
                className='font-poppin font-medium text-[13px] text-[#405189] flex items-center justify-start px-[24px] py-[16px]'
              >
                Personal Details
              </NavLink>
              <NavLink
                to='/change-password'
                className='font-poppin font-medium text-[13px] text-[#405189] flex items-center justify-start px-[24px] py-[16px]'
              >
                Change Password
              </NavLink>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
