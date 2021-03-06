export const UPDATE_FORM = "UPDATE_FORM";
export const CLEAR_FORM = "CLEAR_FORM";
export const RESET_FORM = "RESET_FORM";
export const ALLOWED_DESCRIPTION_LENGTH = 4000;
export const initialState = {
  title: { value: "", touched: false, hasError: true, error: "" },
  subtitle: { value: "", touched: false, hasError: false, error: "" },
  description: { value: "", touched: false, hasError: false, error: "" },
  isbn_10: { value: "", touched: false, hasError: true, error: "" },
  isbn_13: { value: "", touched: false, hasError: true, error: "" },
  author: { value: "", touched: false, hasError: true, error: "" },
  page_count: { value: "", touched: false, hasError: true, error: "" },
  thumbnail_url: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const getFormValidityDataForFocus = (
  name: string,
  value: string,
  formState: Array<any>
) => {
  const data = isFormValid(name, value, formState);
  data.touched = true;
  return data;
};

const getFormValidityDataForInputChange = (
  name: string,
  value: string,
  formState: Array<any>
) => {
  const data = isFormValid(name, value, formState);
  data.touched = false;
  return data;
};

const isFormValid = (name: string, value: string, formState: Array<any>) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }
  return { name, value, hasError, error, touched: true, isFormValid };
};

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (
  name: string,
  value: string,
  dispatch: Function,
  formState: Array<any>
) => {
  const formValidityData = getFormValidityDataForInputChange(
    name,
    value,
    formState
  );
  dispatch({
    type: UPDATE_FORM,
    data: formValidityData,
  });
};

export const onFocusOut = (
  name: string,
  value: string,
  dispatch: Function,
  formState: Array<any>
) => {
  const formValidityData = getFormValidityDataForFocus(name, value, formState);
  dispatch({
    type: UPDATE_FORM,
    data: formValidityData,
  });
};

export const validateInput = (name: string, value: any) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "isbn":
    case "isbn_10":
    case "isbn_13":
      if (value.trim() === "") {
        hasError = true;
        error = "ISBN number cannot be empty";
      } else if (!isValidIsbn(value)) {
        hasError = true;
        error = "Invalid ISBN Number";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "title":
      if (value.trim() === "") {
        hasError = true;
        error = "Title cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "author":
      if (value.trim() === "") {
        hasError = true;
        error = "Author name cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "description":
      if (value.length > ALLOWED_DESCRIPTION_LENGTH) {
        hasError = true;
        error = `Description cannot be more than ${ALLOWED_DESCRIPTION_LENGTH} characters`;
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "first_name":
    case "last_name":
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (value.trim().length > 50) {
        hasError = true;
        error = "Name cannot have more than 50 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "keywords":
      if (value.trim() === "") {
        hasError = true;
        error = "Keywords cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email ID cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "password":
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const isValidForm = (formState: Array<any>, dispatcher: Function) => {
  let isFormValid = true;
  for (const name in formState) {
    const item = formState[name];
    const { value } = item;
    const { hasError, error } = validateInput(name, value);
    if (hasError) {
      isFormValid = false;
    }
    if (name) {
      dispatcher({
        type: UPDATE_FORM,
        data: {
          name,
          value,
          hasError,
          error,
          touched: true,
          isFormValid,
        },
      });
    }
  }
  return isFormValid;
};

export const formsReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_FORM:
      const {
        name,
        value,
        hasError,
        error,
        touched,
        isFormValid,
      } = action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    case CLEAR_FORM:
      return initialState;
    case RESET_FORM:
      return action.data;
    default:
      return state;
  }
};

const isValidIsbn = (str: string) => {
  let sum, weight, digit, check, i;

  str = str.replace(/[^0-9X]/gi, "");

  if (str.length !== 10 && str.length !== 13) {
    return false;
  }

  if (str.length === 13) {
    sum = 0;
    for (i = 0; i < 12; i++) {
      digit = parseInt(str[i]);
      if (i % 2 === 1) {
        sum += 3 * digit;
      } else {
        sum += digit;
      }
    }
    check = (10 - (sum % 10)) % 10;
    return check === parseInt(str[str.length - 1]);
  }

  if (str.length === 10) {
    let lastChar = str[str.length - 1];
    let lastNumberOrChar =
      lastChar.toUpperCase() === "X" ? "X" : parseInt(lastChar);
    weight = 10;
    sum = 0;
    for (let i = 0; i < 9; i++) {
      digit = parseInt(str[i]);
      sum += weight * digit;
      weight--;
    }
    check = (11 - (sum % 11)) % 11;
    if (check === 10) {
      check = "X";
    }
    return check === lastNumberOrChar;
  }
};
