import { Link, NavLink } from 'react-router-dom';
import bgLogin from '../../public/image/image_login.png';
import bgOverlay from '../../public/image/overlay.png'
import { Icon } from '@iconify/react';

export function ForgotPassword() {
  return (
    <>
      <div className='h-screen relative'>
      <div
      style={{
        position: 'relative',
        width: '100%',
        height: '380px', 
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgOverlay})`,
        }}
      />
    </div>

        <div className='absolute left-1/2 -translate-x-1/2 top-[200px] max-w-[451px]'>
          <div className='flex items-center justify-center flex-col'>
            <div className='py-[30px] px-[32px] bg-white mb-[23px] rounded-[4px]'>
              <div className='mb-[30px] text-center'>
                <span className='font-poppin font-medium text-[16px] text-[#405189]'>
                Create new password
                </span>
                <p className='font-poppin font-medium text-[13px] text-[#878A99]'>
                Your new password must be different from previous used 
password.
                </p>
              </div>
              <form action='#'>
                <div className='mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                    Password
                  </label>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='password'
                    placeholder='Enter username'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                  <p className='font-poppin font-medium text-[12px] text-[#878A99]'>Must be at least 8 characters.</p>
                </div>
                <div className='flex items-center justify-between w-full mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                  Confirm Password
                  </label>
                  <a
                    href=''
                    className='inline-block font-poppin text-[13px] font-normal text-[#878A99]'
                  >
                    Forgot password?
                  </a>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='password'
                    placeholder='Enter password'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                </div>
                <button className='mb-[23px] rounded-[4px] h-[38px] text-white font-poppin font-normal text-[13px] inline-block w-full bg-[#0AB39C]'>
                Reset Password
                </button>
              </form>
            </div>
            <div className='text-center'>
              <span>Wait, I remember my password...&nbsp; </span>
              <a className='underline font-semibold' href='#'>
              Click here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
