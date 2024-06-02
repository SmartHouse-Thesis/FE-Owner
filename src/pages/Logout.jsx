import { Link, NavLink } from 'react-router-dom';
import bgLogin from '../../public/image/image_login.png';
import bgOverlay from '../../public/image/overlay.png';
import { Icon } from '@iconify/react';

export function Logout() {
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
              <div className='flex items-center justify-center mb-[30px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='120px'
                  height='120px'
                  viewBox='0 0 24 24'
                >
                  <g
                    fill='none'
                    stroke='green'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                  >
                    <path
                      stroke-dasharray='48'
                      stroke-dashoffset='48'
                      d='M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z'
                    >
                      <animate
                        fill='freeze'
                        attributeName='stroke-dashoffset'
                        dur='0.6s'
                        values='48;0'
                      />
                    </path>
                    <path
                      stroke-dasharray='14'
                      stroke-dashoffset='14'
                      d='M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17'
                    >
                      <animate
                        fill='freeze'
                        attributeName='stroke-dashoffset'
                        begin='0.6s'
                        dur='0.2s'
                        values='14;28'
                      />
                    </path>
                  </g>
                  <mask id='lineMdCoffeeLoop0'>
                    <path
                      fill='none'
                      stroke='#fff'
                      stroke-width='2'
                      d='M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4'
                    >
                      <animateMotion
                        calcMode='linear'
                        dur='3s'
                        path='M0 0v-8'
                        repeatCount='indefinite'
                      />
                    </path>
                  </mask>
                  <rect
                    width='24'
                    height='0'
                    y='7'
                    fill='green'
                    mask='url(#lineMdCoffeeLoop0)'
                  >
                    <animate
                      fill='freeze'
                      attributeName='y'
                      begin='0.8s'
                      dur='0.6s'
                      values='7;2'
                    />
                    <animate
                      fill='freeze'
                      attributeName='height'
                      begin='0.8s'
                      dur='0.6s'
                      values='0;5'
                    />
                  </rect>
                </svg>
              </div>
              <div className='text-center mb-[25px]'>
                <span className='font-poppin font-medium text-[16px] text-[#495057]'>
                  You are Logged Out
                </span>
                <p className='text-[13px] font-poppin font-medium text-[#878A99]'>
                  Thank you for using our service
                </p>
              </div>
              <p></p>
              <Link to="/" className='inline-flex items-center justify-center w-[407px] mb-[23px] rounded-[4px] h-[38px] text-white font-poppin font-normal text-[13px] bg-[#0AB39C]'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
