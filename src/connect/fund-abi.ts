export const fundAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dollarAmount',
        type: 'uint256',
      },
    ],
    name: 'buy', // Купить токен
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dollar', // Адрес доллара
    outputs: [
      {
        internalType: 'contract IDollar',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundToken', // Адрес токена
    outputs: [
      {
        internalType: 'contract IFundToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOpen', // Открыт ли фонд
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'price', // Цена
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fundTokenAmount',
        type: 'uint256',
      },
    ],
    name: 'sell', // Продать токен
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
