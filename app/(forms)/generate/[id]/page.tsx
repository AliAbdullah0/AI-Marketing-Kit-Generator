import GenerateMarketingKit from '@/components/GenerateMarketingKit'
import React from 'react'


type Params = {
  id: string
}

const GenerateKit = async ({params}:{params:Params}) => {
  const {id} = await params
  return (
    <>
      <GenerateMarketingKit kitId={id}/>
    </>
  )
}
export default GenerateKit