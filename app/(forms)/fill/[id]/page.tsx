import FillMarketingKit from '@/components/FillMarketingKit'
import React from 'react'

type Params = {
    id: string
}

const FillPage = async ({ params }: { params: Params }) => {
    const { id } = await params

  return (
    <FillMarketingKit kitId={id}/>
  )
}

export default FillPage