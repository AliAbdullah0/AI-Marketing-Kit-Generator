import { getGeneratedKit } from '@/actions/generated.actions';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type Params = {
  id:string;
}

const PreviewPage = async ({params}:{params:Params}) => {
  const { id } = await params;
  const res = await getGeneratedKit(id);
  console.log(res)
  // const ad = kit?.adIdeas;
  // kit?.brandIdentity  
  // console.log(kit?.brandIdentity)
  
  return (
    <>
    {/* <div className='flex h-screen p-4'>
      <div className='flex px-4 py-3 flex-col gap-2'>
        <h2 className='text-4xl font-bold'>Preview</h2>
        <Separator className='w-full' />
        <div className='flex items-center'>
          <h2 className='md:text-3xl text-lg text-purple-400 font-bold'>Brand Identity:</h2>
          <p className='font-extralight lg:text-base text-sm'>{kit?.brandIdentity}</p>
        </div>
        <Separator className='w-full' />

        <div className='flex items-center'>
          <h2 className='md:text-3xl text-lg text-blue-400 font-bold'>Brand Description:</h2>
          <p className='font-extralight lg:text-base text-sm'>{kit?.businessDescription}</p>
        </div>        
        <Separator className='w-full' />

        <div className='flex items-center'>
          <h2 className='md:text-3xl text-lg text-blue-400 font-bold'>:</h2>
          <p className='font-extralight lg:text-base text-sm'>{}</p>
        </div>
        </div>
        
    </div> */}
    </>
  )
}

export default PreviewPage