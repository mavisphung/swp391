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

//Status of account
export const active = '1';
export const inactive = '0';

//Status of order
export const pending = '0';
export const accepted = '1';
export const finished = '2';
export const cancelled = '3';

//Date format
export const defaultDBDateFormatter = 'DD-MM-YYYY HH:mm';
export const dateConvert = 'YYYY-MM-DD';
export const defaultDatePickerRange = 'DD/MM/YYYY';
