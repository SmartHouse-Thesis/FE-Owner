export function ChangePassword(){
    return (
        <>
         <div className='px-[24px] py-[20px]'>
              <form action=''>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Old Password*
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='password'
                        placeholder='Enter your old password'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                       New Password*
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='password'
                        placeholder='Enter your new password'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Confirm Password*
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='password'
                        placeholder='Enter your confirm password'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end gap-[8px] mt-[50px]'>  
                    <button className='rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#364574]'>Updates</button>
                    <button className='rounded-[4px] text-[#0AB39C] py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#a5f3e8]'>Cancel</button>
                </div>
              </form>
            </div>
        </>
    )
}