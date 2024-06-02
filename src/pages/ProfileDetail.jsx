export function ProfileDetail(){
    return (
        <>
         <div className='px-[24px] '>
              <form action=''>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        First Name
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder='Enter your firstname'
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
                        Last Name
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder='Enter your lastname'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Email Address
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder='Enter your email'
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
                        Phone Number
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='number'
                        placeholder='Enter your phone number'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Joining Date
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='number'
                        placeholder='Select date'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Designation
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='text'
                        placeholder=''
                        value='Teller'
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
                        Skills
                      </label>
                    </div>
                    <div className='w-full'>
                      <input
                        type='number'
                        placeholder='Enter your skill'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center mb-[15px] gap-[24px]'>
                  <div className='w-full'>
                    <div className='mb-[8px]'>
                      <label
                        className='font-poppin font-medium text-[13px]'
                        htmlFor=''
                      >
                        Description
                      </label>
                    </div>
                    <div className='w-full'>
                      <textarea
                        rows={8}
                        type='text'
                        placeholder=''
                        value='Teller'
                        className='rounded-[4px] w-full px-[15px] pt-[8px] pb-[10px] font-poppin font-normal text-[13px] outline-none border border-[#CED4DA]'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end gap-[8px] '>  
                    <button className='rounded-[4px] text-white py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#364574]'>Updates</button>
                    <button className='rounded-[4px] text-[#0AB39C] py-[8.5px] px-[15.5px] text-[13px] font-normal font-poppin bg-[#a5f3e8]'>Cancel</button>
                </div>
              </form>
            </div>
        </>
    )
}