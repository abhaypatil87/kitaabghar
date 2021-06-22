import { useState } from "react";

const useAlert = () => {
  const [showError, setShowError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("Please enter all the required fields");
  const [success, setSuccess] = useState("");

  return {
    showSuccess,
    showError,
    setShowSuccess,
    setShowError,
    error,
    setError,
    success,
    setSuccess,
    showNotification,
    setShowNotification,
  };
};
export default useAlert;
