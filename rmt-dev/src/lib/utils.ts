import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "An unknown error occurred";
    }
    toast.error("Error fetching job items: " + errorMessage);
  }