import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ChangeEvent,
  type FocusEvent
} from 'react'
import {
  Input,
  type InputRef
} from 'antd'
import IMask, {
  createPipe,
  InputMask
} from 'imask'

// types
import {
  InputMaskOptions,
  MaskedInputProps,
  OnChangeEvent
} from './types'

export function MaskedInput( {
  ref,
  mask,
  maskOptions: propsMaskOptions,
  value: propsValue,
  defaultValue,
  definitions,
  ...props
}: MaskedInputProps ) {
  const KEY_PRESS_EVENT = keyPressPropName()
  const propValue = ( () => {
    if (
      typeof defaultValue === 'string' &&
      defaultValue.trim().length > 0
    ) {
      return defaultValue
    }

    return propsValue ?? ''
  } )()
  const [ value, setValue ] = useState( propValue )
  const lastValue = useRef( propValue )
  const innerRef = useRef<HTMLInputElement | null>( null )
  const imask = useRef<InputMask<any> | null>( null )
  const maskOptions = useMemo( () => ( {
    mask,
    definitions: {
      '0': /[0-9]/,
      ...definitions
    },
    lazy: false, // make placeholder always visible
    ...propsMaskOptions
  } as InputMaskOptions ), [ mask ] )

  const placeholder = useMemo( () => (
    createPipe( maskOptions as any )( '' )
  ), [ maskOptions ] )

  const onEvent = useCallback( (
    event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
    execOnChangeCallback = false
  ) => {
    const masked = imask.current
    if ( !masked ) return

    if (
      event.target &&
      event.target.value !== masked.value
    ) {
      masked.value = event.target.value
      event.target.value = masked.value
      lastValue.current = masked.value
    }

    Object.assign( event, {
      maskedValue: masked.value,
      unmaskedValue: masked.unmaskedValue,
    } )

    masked.updateValue()
    setValue( lastValue.current )

    if ( execOnChangeCallback ) {
      props.onChange?.( event as OnChangeEvent )
    }
  }, [] )

  const onAccept = useCallback( (
    event?: any
  ) => {
    if ( !event?.target ) return

    const input = innerRef.current
    const masked = imask.current
    if ( !input || !masked ) return

    event.target.value = masked.value
    input.value = masked.value
    lastValue.current = masked.value

    onEvent( event, true )
  }, [] )

  useEffect( () => {
    updateMaskRef()

    return () => {
      imask.current?.destroy()
      imask.current = null
    }
  }, [ mask ] )

  useEffect( () => {
    updateValue( propValue )
  }, [ propValue ] )

  const eventHandlers = useMemo( () => ( {
    onBlur( event: any ) {
      onEvent( event )
      props.onBlur?.( event )
    },
    onPaste( event: any ) {
      lastValue.current = event.clipboardData?.getData( 'text' )

      if ( event.target ) {
        event.target.value = lastValue.current
      }

      onEvent(
        event,
        true
      )
      props.onPaste?.( event )
    },
    onFocus( ev: any ) {
      onEvent( ev )
      props.onFocus?.( ev )
    },
    [ KEY_PRESS_EVENT ]: ( event: any ) => {
      onEvent(
        event,
        true
      )
      props[ KEY_PRESS_EVENT ]?.( event )
    },
  } ), [] )

  function updateMaskRef() {
    const input = innerRef.current

    if ( imask.current ) {
      imask.current.updateOptions( maskOptions as any )
    }

    if ( !imask.current && input ) {
      imask.current = IMask<any>( input, maskOptions )
      imask.current.on( 'accept', onAccept )
    }

    if ( imask.current && imask.current.value !== lastValue.current ) {
      imask.current.value = lastValue.current
      imask.current.alignCursor()
    }
  }

  function handleRef(
    currentRef: InputRef | null
  ) {
    if ( ref ) {
      switch ( typeof ref ) {
        case 'function': {
          ref( currentRef )
          break
        }
        default: ref.current = currentRef
      }
    }

    if ( !currentRef?.input ) {
      return
    }

    innerRef.current = currentRef.input
    if ( !imask.current ) {
      updateMaskRef()
    }
  }

  function updateValue(
    value: string
  ) {
    lastValue.current = value
    const input = innerRef.current
    const masked = imask.current

    if ( !( input && masked ) ) return

    masked.value = value
    input.value = masked.value
    lastValue.current = masked.value
  }

  function keyPressPropName() {
    if (
      typeof navigator !== 'undefined' &&
      navigator.userAgent.match( /Android/i )
    ) {
      return 'onBeforeInput'
    }
    return 'onKeyPress'
  }

  return (
    <Input
      placeholder={ placeholder }
      { ...props }
      { ...eventHandlers }
      onChange={ ( e ) => onEvent( e, true ) }
      value={ value }
      ref={ handleRef }
    />
  )
}

export default MaskedInput
export { IMask }
