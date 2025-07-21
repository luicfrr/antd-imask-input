import React, { ReactNode } from 'react'
import { MaskedInput } from '@/index'

function Index(): ReactNode {

  return ( <>
    <MaskedInput
      mask='000.000.000-00'
      maskOptions={ {
        lazy: true
      } }
      placeholder='type here'
    />

    <MaskedInput
      mask='(00) 00000-0000'
      maskOptions={ {
        lazy: true
      } }
      placeholder='type here'
    />
  </> )
}

export default Index
