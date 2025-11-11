import React, { ReactNode } from 'react'
import { MaskedInput } from 'antd-imask-input'

function Index(): ReactNode {

  return ( <>
    <MaskedInput
      allowClear
      maskOptions={ {
        mask: '000.000.000-00',
        lazy: true
      } }
      placeholder='cpf'
    />

    <MaskedInput
      allowClear
      maskOptions={ {
        mask: '(00) 00000-0000',
        lazy: true
      } }
      placeholder='phone'
    />

    <MaskedInput
      allowClear
      maskOptions={ {
        mask: [ {
          mask: '000.000.000-00'
        }, {
          mask: /./
        } ],
        lazy: true
      } }
      placeholder='multiple'
    />

    <MaskedInput
      allowClear
      maskOptions={ {
        mask: [
          { mask: '\\0,\\00' },
          { mask: '\\0,00' },
          { mask: '0,00' },
          { mask: '00,00' },
          { mask: '000,00' },
          { mask: '0.000,00' },
          { mask: '00.000,00' },
          { mask: '000.000,00' },
          { mask: '0.000.000,00' },
        ],
        lazy: true
      } }
      placeholder='money'
    />
  </> )
}

export default Index
