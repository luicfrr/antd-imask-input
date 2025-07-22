import React, { ReactNode } from 'react'
import { MaskedInput } from 'antd-imask-input'

function Index(): ReactNode {

  return ( <>
    <MaskedInput
      enableLogs
      mask='000.000.000-00'
      maskOptions={ {
        lazy: true
      } }
      placeholder='type here'
    />

    <MaskedInput
      enableLogs
      mask='(00) 00000-0000'
      maskOptions={ {
        lazy: true
      } }
      placeholder='type here'
    />
  </> )
}

export default Index
