## 📚 Introduction

An iMasked [Ant Design Input](https://ant.design/components/input) component.

Is this package usefull to you?

<a href="https://www.buymeacoffee.com/luicfrr" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Or give it a ⭐ on [GitHub](https://github.com/luicfrr/antd-imask-input).

## 🧰 Installation

```bash
yarn add antd-imask-input
```

## 💡 Usage Example
```tsx
import InputMasked from 'antd-imask-input'

function MyMaskedInputComponent() {

  return (
    <InputMasked
      mask={ '0[0][0].0[0][0].0[0][0].0[0][0]' }
      maskOptions={ {
        lazy: true // makes mask placeholder invisible
      } }
      placeholder={ 'Type here' }
      size={  'large' }
      allowClear={ true }
      autoComplete='off'
      // ... any other react/antd prop
    />
  )
}
```

## Mask Options
| Option  | Description | Options |
| ------------- | ------------- | ------------- |
| `mask` | [iMask mask pattern](https://imask.js.org/guide.html) | `string` \| `RegExp` \| `Date` \| `number` |
| `onChange` | Mask change event. | (event: ChangeEvent<HTMLInputElement> & {maskedValue: string unmaskedValue: string }) => any |
| `maskOptions` | [iMask options](https://imask.js.org/guide.html)  | See `InputMaskOptions` |
| `enableLogs` | Enables component logs | `false` |
| `props` | Any other React/Antd props | - |

## 👷 Built With

- [iMask](https://imask.js.org/)
- [Ant Design](https://ant.design/)

## 🔎 About

This package requires you to use:
- `react`: `>= 18`
- `antd`: `>= 5`

Make sure to use only supported versions before opening issues.

## 📚 Author

Made with ❤️ by [luicfrr](https://github.com/luicfrr)
