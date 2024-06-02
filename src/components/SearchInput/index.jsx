import { Icon } from "@iconify/react";

export function SearchInput(){
    return (
        <div className='flex items-center relative'>
        <Icon
          icon='material-symbols-light:search'
          style={{ color: '#9599AD' }}
          className='absolute left-[13px]'
        />
        <input
          type='text'
          placeholder='Tìm kiếm'
          className='font-poppin  outline-none font-normal text-[13px] w-[300px] rounded-[4px] bg-[#F3F3F9] pt-[8px] pb-[10px] pl-[40px] pr-[10px]'
        />
      </div>
    )
}