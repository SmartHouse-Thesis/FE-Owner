export function Pagination() {
  return (
    <>
      <div className='flex justify-between items-centerz py-[20px] px-[20px] '>
        <span className='text-[13px] font-normal'>Showing 5 of 25 Results</span>
        <div className='flex items-center gap-[5px]'>
          <span className='font-poppin font-normal text-[11px] inline-block py-[5px] px-[9px] rounded-[4px] border border-[#E9EBEC]'>
            1
          </span>
          <span className='font-poppin font-normal text-[11px] inline-block py-[5px] px-[9px] rounded-[4px] border border-[#E9EBEC]'>
            2
          </span>
          <span className='font-poppin font-normal text-[11px] inline-block py-[5px] px-[9px] rounded-[4px] border border-[#E9EBEC]'>
            3
          </span>
        </div>
      </div>
    </>
  );
}
