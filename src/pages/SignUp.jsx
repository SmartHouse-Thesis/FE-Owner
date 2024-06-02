import { Link, NavLink } from 'react-router-dom';
import bgLogin from '../../public/image/image_login.png';
import bgOverlay from '../../public/image/overlay.png'
import { Icon } from '@iconify/react';

export function SignUp() {
  return (
    <>
      <div className='h-screen relative'>
      <div
      style={{
        position: 'relative', // Để phần tử con có thể được định vị tương đối đến phần tử cha
        width: '100%',
        height: '380px', // Thay đổi kích thước tùy thuộc vào yêu cầu của bạn
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
          backgroundImage: `url(${bgOverlay})`, // Màu và độ trong suốt của overlay
        }}
      />
      {/* Nội dung của bạn ở đây */}
    </div>

        <div className='absolute left-1/2 -translate-x-1/2 top-[200px] max-w-[451px]'>
          <div className='flex items-center justify-center flex-col'>
            <div className='py-[30px] px-[32px] bg-white mb-[23px] rounded-[4px]'>
              <div className='mb-[30px] text-center'>
                <span className='font-poppin font-medium text-[16px] text-[#405189]'>
                Create New Account
                </span>
                <p className='font-poppin font-medium text-[13px] text-[#878A99]'>
                  Sign in to be member of PhatDat.
                </p>
              </div>
              <form action='#'>
              <div className='mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                  Email *
                  </label>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='text'
                    placeholder='Enter username'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                </div>
                <div className='mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                    Username
                  </label>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='text'
                    placeholder='Enter username'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                </div>
                <div className='flex items-center justify-between w-full mb-[8px]'>
                  <label htmlFor='' className='font-poppin font-medium text-[13px]'>
                    Password
                  </label>
                </div>
                <div className='mb-[15px]'>
                  <input
                    type='password'
                    placeholder='Enter password'
                    className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'
                  />
                  <p className='mt-[8px] text-[12px] font-poppin italic font-normal text-[#878A99]'>By registering you agree to the Velzon <span className='not-italic text-[#405189]'>Terms of Use</span></p>
                </div>
                <Link to="/" className='inline-flex items-center justify-center mb-[23px] rounded-[4px] h-[38px] text-white font-poppin font-normal text-[13px] inline-block w-full bg-[#0AB39C]'>
                  Sign Up
                </Link>
              </form>
              <div className='flex items-center justify-center mb-[25px]'>
                <span className='text-[13px] font-poppin font-normal text-[#495057]'>
                Create account with
                </span>
              </div>
              <div className='flex items-center justify-center gap-[4px]'>
                <a className='inline-flex rounded-[4px] items-center justify-center bg-[#405189] w-[37px] h-[37px] '>
                  <Icon icon='ri:facebook-fill' style={{ color: 'white' }} />
                </a>
                <a className='inline-flex rounded-[4px] items-center justify-center bg-[#F06548] w-[37px] h-[37px] '>
                  <Icon icon='ri:google-fill' style={{ color: 'white' }} />
                </a>
                <a className='inline-flex rounded-[4px] items-center justify-center bg-[#212529] w-[37px] h-[37px] '>
                  <Icon icon='ri:github-fill' style={{ color: 'white' }} />
                </a>
                <a className='inline-flex rounded-[4px] items-center justify-center bg-[#299CDB] w-[37px] h-[37px] '>
                  <Icon icon='ri:twitter-fill' style={{ color: 'white' }} />
                </a>
              </div>
            </div>
            <div className='text-center'>
              <span>Already have an account ?&nbsp; </span>
              <a className='underline font-semibold' href='#'>
                Signin
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
