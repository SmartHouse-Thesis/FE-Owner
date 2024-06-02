import { Icon } from '@iconify/react';
import usa_flag from '../../../public/image/flag_usa.png';
import avatar from '../../../public/image/user.png';
import { BreadCrumb } from '../BreadCrumb';
import { SearchInput } from '../SearchInput';
import { jwtDecode } from 'jwt-decode';
import userLoginApi from '../../api/user';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import notificationsAPI from '../../api/notifications';
import { PayloadContext } from '../../context/payload';
import { message } from 'antd';
export function MainHeader() {
  const userDecode = localStorage.getItem('accessToken');
  const userInfo = jwtDecode(userDecode);

  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const { payload } = useContext(PayloadContext);
  const { isPending: userLoginPending, mutate } = useMutation({
    mutationFn: () => userLoginApi.getUserInfo(),
    onSuccess: (response) => {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Error occur when get user',
      });
    },
  });

  const { isPending: notificationLoading, mutate: mutateNotifications } =
    useMutation({
      mutationFn: () => notificationsAPI.getNotification(),
      onSuccess: (response) => {
        setNotification(response.data);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Error occur when get products list',
        });
      },
    });
  useEffect(() => {
    if(payload){
      setShowNotify(true);
      messageApi.open({
        type: 'info',
        content: payload.notification.body,
      });
    }
    mutate();
    mutateNotifications();
  }, [payload]);
  const showModal = () => {
    setOpenModal(!openModal);
    setShowNotify(false)
  }
  return (
    <>
    {contextHolder}
      <div className='h-[70px] bg-white border-b border-[#F3F3F9] flex items-center justify-between'>
        <div className='pl-[27px] pr-[24px] flex items-center justify-end w-full'>
          <div className='flex items-center gap-[24px]'>
            <div
              className='relative cursor-pointer'
              onClick={() => showModal()}
            >
              <Icon
                icon='mdi:notifications-none'
                width='30'
                height='30'
                style={{ color: '#878a99' }}
              />
              {showNotify ? <span className='absolute w-[17px] h-[17px] text-[12px] leading-[15px] top-0 right-0 bg-red-400 rounded-full flex items-center justify-center'>!</span> : ''}
              {openModal ? (
                <div className='absolute w-[300px] overflow-y-scroll bg-red top-[40px] z-50 right-0 h-[250px] shadow-md'>
                  <div className='bg-[#405189] w-full h-[60px] flex items-center p-[20px]'>
                    <span className='font-poppin text-[14px] text-white'>
                      Notifications
                    </span>
                  </div>
                  <div className='w-full bg-white h-auto'>
                    <nav className='p-[10px]'>
                      <ul className=''>
                        {notification?.map((item) => (
                          <li className=' flex gap-[10px] border-b pb-2'>
                            {' '}
                            <Icon
                              icon='mdi:alert-circle'
                              width='30'
                              height='30'
                              style={{ color: '#DFF0FA' }}
                            />
                            <div className='flex flex-col flex-1'>
                              <span className='text-[12px] '>{item.title}</span>
                              <span className='text-[12px]'>{item.body}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex gap-[13px] bg-[#F3F3F9] py-[16px] px-[15px]'>
              <img
                src={user?.avatar ? user?.avatar : avatar}
                alt=''
                className='w-[32px] h-[32px] rounded-[100%]'
              />
              <div className='flex flex-col'>
                <span className='font-poppin font-normal text-[13px] text-[#212529]'>
                  {user?.fullName}
                </span>
                <span className='font-poppin font-normal text-[12px] text-[#9599AD]'>
                  {userInfo?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
