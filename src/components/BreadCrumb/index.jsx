export function BreadCrumb({ name }) {
  return (
    <>
      <div className='h-[40px] bg-white border-b border-[#9599AD] flex items-center justify-between'>
        <div className='pl-[27px] pr-[24px] flex items-center justify-between w-full'>
          <span className='font-poppin font-bold text-[15px] text-[#495057]'>
            {name}
          </span>
        </div>
      </div>
    </>
  );
}
