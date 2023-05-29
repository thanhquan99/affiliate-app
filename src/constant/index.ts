export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  OPTIONAL = 'optional',
}

export const SALT = '$2b$10$leL65eC89pj8mWzejdSVbe';

export enum TRANSACTION_STATUS {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}
export enum TRANSACTION_TYPE {
  PAY_IN = 'Pay-in',
  PAY_OUT = 'Pay-out',
}

export const SUBSCRIPTION = {
  TRIAL: {
    name: 'Trial',
    price: 0,
  },
  BASIC: {
    name: 'Basic',
    price: 10,
  },
  PREMIUM: {
    name: 'Premium',
    price: 20,
  },
};

export enum COMMISSION_STATUS {
  PENDING = 'Pending',
  APPROVE = 'Approve',
  REJECT = 'Reject',
}
