export const templateEmailPlaceholder = 'abc@chystore.vn';

export const emailPattern = /^\w+([\.-]?\w+)*@chystore.vn$/;
export const emailCommonPattern =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+|chystore.vn$/;
export const fullNamePattern =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
export const phonePattern = /^((\+)84|0)[1-9](\d{2}){4}$/;
export const birdAgePattern = /^\d+\s{1}(năm|tháng)$/;

// Role Id
export const Admin = 1;
export const Staff = 2;
export const Customer = 3;

// Status of account
export const active = true;
export const inactive = false;

// Status of order
export const accepted = 1;
export const finished = 2;
export const cancelled = 3;
export const pending = 4;

// Status of product
export const outOfStock = 1;
export const available = 2;

// Date format
export const defaultDBDateFormatter = 'DD-MM-YYYY HH:mm';
export const dateConvert = 'YYYY-MM-DD';
export const defaultDatePickerRange = 'DD/MM/YYYY';
export const dateTimeConvert = 'YYYY-MM-DDTHH:mm:ss';
export const defaultDateTimePickerRange = 'DD/MM/YYYY HH:mm';

// Payment Method
export const vnpay = 1;
export const atStore = 2;
export const cod = 3;
export const payInAdvance = 4;

// Media Type
export const png = 0;
export const jpeg = 1;
export const jpg = 2;
export const pdf = 3;
export const svg = 4;
export const mp4 = 5;
export const mov = 6;
export const avi = 7;
export const wmv = 8;
