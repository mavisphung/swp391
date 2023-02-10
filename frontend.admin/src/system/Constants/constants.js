export const templateEmailPlaceholder = 'abc@chytech.com.vn';

export const emailPattern =
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+|(?:chytech\.)+(?:com\.)+(?:vn)$/;
export const fullNamePattern =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
export const phonePattern = /^((\+)84|0)[1-9](\d{2}){4}$/;

//Status of account
export const active = '1';
export const inactive = '0';

//Status of order
export const success = '0';
export const paidInAdvance = '1';
export const waiting = '2';
export const inProgress = '3';
export const denied = '4';
export const canceled = '5';

//Date format
export const defaultDBDateFormatter = 'DD-MM-YYYY HH:mm';
export const dateConvert = 'YYYY-MM-DD';
export const defaultDatePickerRange = 'DD/MM/YYYY';
