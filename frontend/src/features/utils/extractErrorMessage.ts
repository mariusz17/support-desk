import axios from "axios";

// Custom error message handler for Axios responses
const extractErrorMessage = (error: unknown): string => {
  let message: string;
  if (axios.isAxiosError(error)) {
    message = error.response?.data.message || error.message;
  } else {
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
  }

  return message;
};

export default extractErrorMessage;
