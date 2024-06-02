import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <>
      <div className='relative flex justify-center  bg-[#405189]'>
        <div className='sticky h-screen left-0 top-0 flex flex-col items-center'>
          <div className='mb-[40px] mt-[26px]'>
            <span className='font-poppin text-[30px] font-bold text-[#9599AD]'>
              PhatDat
            </span>
          </div>
          <div className='flex flex-col justify-between items-center h-full'>
            <div className='flex flex-col gap-[28px]'>
              <div className='flex items-center justify-between gap-[50px]'>
                <Link to='/request' className=''>
                  <div className='flex items-center justify-center gap-[10px]'>
                    <Icon
                      icon='ri:customer-service-fill'
                      style={{ color: '#9599AD' }}
                      className='w-[18px] h-[18px]'
                    />
                    <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                      Yêu cầu
                    </span>
                  </div>
                </Link>
               
              </div>
              <div>
                <Link
                  to='/survey'
                  className='flex items-center justify-start gap-[10px]'
                >
                  <Icon
                    icon='material-symbols:contract'
                    style={{ color: '#9599AD' }}
                    className='w-[18px] h-[18px]'
                  />
                  <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                    Khảo sát
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  to='/construction'
                  className='flex items-center justify-start gap-[10px]'
                >
                  <Icon
                    icon='material-symbols:contract'
                    style={{ color: '#9599AD' }}
                    className='w-[18px] h-[18px]'
                  />
                  <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                    Hợp đồng
                  </span>
                </Link>
              </div>

              <div className='flex items-center justify-between gap-[50px]'>
                <Link to='/device-page' className=''>
                  <div className='flex items-center justify-center gap-[10px]'>
                    <Icon
                      icon='material-symbols:devices'
                      style={{ color: '#9599AD' }}
                      className='w-[18px] h-[18px]'
                    />
                    <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                      Sản phẩm
                    </span>
                  </div>
                </Link>
               
              </div>
              <div className='flex items-center justify-between gap-[50px]'>
                <Link to='/package-page' className=''>
                  <div className='flex items-center justify-center gap-[10px]'>
                    <Icon
                      icon='material-symbols:devices'
                      style={{ color: '#9599AD' }}
                      className='w-[18px] h-[18px]'
                    />
                    <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                      Gói sản phẩm
                    </span>
                  </div>
                </Link>
               
              </div>
              <div>
                <Link
                  to='/manufacture'
                  className='flex items-center justify-start gap-[10px]'
                >
                  <Icon
                    icon='material-symbols:manufacturing'
                    style={{ color: '#9599AD' }}
                    className='w-[18px] h-[18px]'
                  />
                  <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                    Hãng sản xuất
                  </span>
                </Link>
              </div>
              {/* <div>
              <a href='' className='flex items-center justify-start gap-[10px]'>
                <Icon
                  icon='streamline:information-desk'
                  style={{ color: '#9599AD' }}
                  className='w-[18px] h-[18px]'
                />
                <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                  Information
                </span>
              </a>
            </div>
            <div>
              <Link to="/promotion" className='flex items-center justify-start gap-[10px]'>
                <Icon
                  icon='ep:promotion'
                  style={{ color: '#9599AD' }}
                  className='w-[18px] h-[18px]'
                />
                <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                  Promotion
                </span>
              </Link>
            </div> */}
                          <div className='flex items-center justify-between gap-[50px]'>
                <Link to='/promotion' className=''>
                  <div className='flex items-center justify-center gap-[10px]'>
                    <Icon
                      icon='material-symbols:devices'
                      style={{ color: '#9599AD' }}
                      className='w-[18px] h-[18px]'
                    />
                    <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                      Khuyến mãi
                    </span>
                  </div>
                </Link>
               
              </div>
              <div>
                <Link
                  to='/chat'
                  className='flex items-center justify-start gap-[10px]'
                >
                  <Icon
                    icon='material-symbols:chat'
                    style={{ color: '#9599AD' }}
                    className='w-[18px] h-[18px]'
                  />
                  <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                    Chat
                  </span>
                </Link>
              </div>


              {/* <div>
              <Link to='/assign-staff' className='flex items-center justify-start gap-[10px]'>
                <Icon
                  icon='guidance:care-staff-area'
                  style={{ color: '#9599AD' }}
                  className='w-[18px] h-[18px]'
                />
                <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                  Assign staff
                </span>
              </Link>
            </div> */}
              {/* <div>
                <Link
                  to='/profile'
                  className='flex items-center justify-start gap-[10px]'
                >
                  <Icon
                    icon='guidance:care-staff-area'
                    style={{ color: '#9599AD' }}
                    className='w-[18px] h-[18px]'
                  />
                  <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                    Thông tin cá nhân
                  </span>
                </Link>
              </div> */}


            </div>

            <div className='pb-[40px]'>
              <Link
                to='/log-out'
                className='flex items-center justify-start gap-[10px]'
              >
                <Icon
                  icon='guidance:care-staff-area'
                  style={{ color: '#9599AD' }}
                  className='w-[18px] h-[18px]'
                />
                <span className='font-hk font-medium text-[15px] text-[#ABB9E8]'>
                  Đăng xuất
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
