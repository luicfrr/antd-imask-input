import React, {
  ReactNode
} from 'react'
import {
  AutoComplete,
  Form
} from 'antd'
import {
  IMask,
  MaskedInput
} from 'antd-imask-input'
import {
  MaskedPattern
} from 'imask'

function Index(): ReactNode {
  const [ form ] = Form.useForm()
  const rangeMask: Partial<MaskedPattern> = {
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }
  }

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
        mask: /^[1-6]\d{0,5}$/,
        lazy: true
      } }
      placeholder='regex (real)'
    />

    <MaskedInput
      allowClear
      maskOptions={ {
        mask: '/^[1-6]\\d{0,5}$/',
        lazy: true
      } }
      placeholder='regex (string)'
    />

    <MaskedInput
      allowClear
      defaultValue={ '123' }
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

    <AutoComplete
      options={ [ {
        label: 'Person 1 - 123.456.789-00',
        value: '12345678900'
      }, {
        label: 'Person 2 - 987.654.321-00',
        value: '98765432100'
      } ] }
      onSelect={ ( value: string ) => {
        console.log( 'selected value', value )
      } }
      filterOption={ (
        inputValue,
        option
      ) => {
        if ( !option ) return false

        const {
          value,
          label
        } = option

        return (
          String( value ).toLowerCase().indexOf( inputValue.toLowerCase() ) > -1 ||
          String( label ).toLowerCase().indexOf( inputValue.toLowerCase() ) > -1
        )
      } }
    >
      <MaskedInput
        allowClear
        maskOptions={ {
          mask: '000.000.000-00',
          lazy: true
        } }
        placeholder='cpf'
      />
    </AutoComplete>

    <MaskedInput
      allowClear
      maskOptions={ {
        mask: [ {
          mask: ''
        }, {
          mask: '\\0\\0`:\\00',
        }, {
          mask: '\\0\\0`:mm',
          ...rangeMask
        }, {
          mask: '\\00`:mm',
          ...rangeMask
        }, {
          mask: '00`:mm',
          ...rangeMask
        }, {
          mask: '000:mm',
          ...rangeMask
        }, {
          mask: '0000:mm',
          ...rangeMask
        }, {
          mask: '00000:mm',
          ...rangeMask
        }, {
          mask: '000000:mm',
          ...rangeMask
        } ]
      } }
      placeholder='ranged mask'
      size='large'
    />

    <Form
      form={ form }
      initialValues={ {
        cpf: '12345678900'
      } }
    >
      <Form.Item
        id='cpf'
        key='cpf'
        name='cpf'
        normalize={ ( value ) => console.log( 'normalize', value ) }
      >
        <MaskedInput
          allowClear
          // maskReturn
          maskOptions={ {
            mask: '000.000.000-00',
            lazy: true
          } }
          placeholder='form cpf'
        />
      </Form.Item>
    </Form>
  </> )
}

export default Index
