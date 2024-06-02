import { Link, NavLink } from 'react-router-dom';
import bgLogin from '../../public/image/image_login.png';
import bgOverlay from '../../public/image/overlay.png'
import { Icon } from '@iconify/react';

export function ResetPassword() {
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
                <span className='font-poppin inline-block mb-[10px] font-medium text-[16px] text-[#405189]'>
                Forgot Password?
                </span>
                <p className='font-poppin font-medium text-[13px] text-[#878A99]'>
                Reset password with us
                </p>
                <div className='flex items-center justify-center mt-[20px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px" viewBox="0 0 24 24"><g fill="none" stroke="green" stroke-linecap="round" stroke-width="2"><rect width="18" height="14" x="3" y="5" stroke-dasharray="64" stroke-dashoffset="64" rx="1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></rect><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5L12 12L21 6.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="24;0"/></path></g></svg>
                </div>
                <span className='inline-block px-[24px] py-[12px] font-poppin font-normal text-[13px] bg-[#FEF4E4] text-[#B98A38]'>Enter your email and instructions will be sent to you!</span>
              </div>
              <form action='#'>
                <div className='flex items-center justify-between w-full mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                  Email
                  </label>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='password'
                    placeholder='Enter Email'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                </div>
                <button className='mb-[23px] rounded-[4px] h-[38px] text-white font-poppin font-normal text-[13px] inline-block w-full bg-[#0AB39C]'>
                Send Reset Link
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
