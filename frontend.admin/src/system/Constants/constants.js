export const templateEmailPlaceholder = 'abc@chystore.vn';

export const emailPattern =
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+|(?:chystore\.)+(?:com\.)+(?:vn)$/;
export const fullNamePattern =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
export const phonePattern = /^((\+)84|0)[1-9](\d{2}){4}$/;

// Role Id
export const Admin = 1;
export const Staff = 2;
export const Customer = 3;

// Status of account
export const active = true;
export const inactive = false;

// Status of order
export const pending = 0;
export const accepted = 1;
export const finished = 2;
export const cancelled = 3;

// Status of product
export const outOfStock = 0;
export const available = 1;

// Date format
export const defaultDBDateFormatter = 'DD-MM-YYYY HH:mm';
export const dateConvert = 'YYYY-MM-DD';
export const defaultDatePickerRange = 'DD/MM/YYYY';

// Payment Method
export const vnpay = 0;
export const atStore = 1;
export const payInAdvance50 = 2;
export const cod = 3;
