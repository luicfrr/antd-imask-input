import React, { ReactNode } from 'react'
import { MaskedInput } from 'antd-imask-input'

function Index(): ReactNode {

  return ( <>
    <MaskedInput
      maskOptions={ {
        mask: '000.000.000-00',
        lazy: true
      } }
      placeholder='type here'
    />

    <MaskedInput
      maskOptions={ {
        mask: '(00) 00000-0000',
        lazy: true
      } }
      placeholder='type here'
    />

    <MaskedInput
      maskOptions={ {
        mask: [ {
          mask: '000.000.000-00'
        }, {
          mask: /./
        } ],
        lazy: true
      } }
      placeholder='type here'
    />
  </> )
}

export default Index
