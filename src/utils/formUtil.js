export const UPDATE_FORM = "UPDATE_FORM";
export const CLEAR_FORM = "CLEAR_FORM";
export const RESET_FORM = "RESET_FORM";

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

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (name, value, dispatch, formState) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false;
      break;
    }
  }
  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const onFocusOut = (name, value, dispatch, formState) => {
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
  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

export const validateInput = (name, value) => {
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
    case "first_name":
    case "last_name":
      if (value.trim() === "") {
        hasError = true;
        error = "Author name cannot be empty";
      } else if (value.trim().length > 50) {
        hasError = true;
        error = "Name cannot have more than 50 characters";
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

export const isValidForm = (formState, dispatcher) => {
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

export const formsReducer = (state, action) => {
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

const isValidIsbn = (str) => {
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
    lastChar = lastChar.toUpperCase() === "X" ? "X" : +lastChar;
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
    return check === lastChar;
  }
};
