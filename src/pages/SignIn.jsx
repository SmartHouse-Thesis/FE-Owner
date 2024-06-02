import { Link, NavLink, useNavigate } from 'react-router-dom';
import bgLogin from '../../public/image/image_login.png';
import bgOverlay from '../../public/image/overlay.png';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import AuthenticateAPI from '../api/authen';
import { jwtDecode } from 'jwt-decode';

export function SignIn() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: AuthenticateAPI.LoginAccount,
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      const userDecode = jwtDecode(response.accessToken);
      navigate('/request');
    },
    onError: (response) => {
      console.log(response);
      messageApi.open({
        type: 'error',
        content: 'Your account is invalid. Please  try again !!',
      });
    },
  },);

  const rememberHandler = () => {
    setValue({ ...value, remember: !value.remember });
  };

  const submitForm = (values) => {
    console.log(values);
    mutate(values);
  };

  return (
    <>
      {contextHolder}
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
                  Welcome Back !
                </span>
                <p className='font-poppin font-medium text-[13px] text-[#878A99]'>
                  Sign in to continue to PhatDat.
                </p>
              </div>
              <Form
                layout='vertical'
                requiredMark={false}
                form={form}
                onFinish={submitForm}
              >
                <div className='mb-[8px]'>
                  <Form.Item
                    name='phoneNumber'
                    label='Phone Number'
                    className='font-poppin font-medium text-[13px]'
                  >
                    <Input className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border'/>
                  </Form.Item>
                </div>
                <div className='mb-[15px]'>
                  <Form.Item
                    name='password'
                    label='Password'
                  >
                    <Input.Password className='w-[387px] pl-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] border-[#CED4DA] border' />
                  </Form.Item>
                </div>
                <div className='flex items-center justify-between w-full mb-[8px]'>
                  <label
                    htmlFor=''
                    className='font-poppin font-medium text-[13px]'
                  >
                    Password
                  </label>
                  <a
                    href=''
                    className='inline-block font-poppin text-[13px] font-normal text-[#878A99]'
                  >
                    Forgot password?
                  </a>
                </div>
                <Button
                  loading={isPending}
                  htmlType='submit'
                  className='inline-flex items-center justify-center mb-[23px] rounded-[4px] h-[38px] text-white font-poppin font-normal text-[13px] inline-block w-full bg-[#0AB39C]'
                >
                  Login Account
                </Button>
              </Form>

              <div className='flex items-center justify-center mb-[25px]'>
                <span className='text-[13px] font-poppin font-normal text-[#495057]'>
                  Sign In with
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
              <span>Don't have an account ?&nbsp; </span>
              <Link to='/register' className='underline font-semibold' href='#'>
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// information
// promotion
// chat
// customer request
// construction contract
// Assign staff
// wanranty
// Request
//
