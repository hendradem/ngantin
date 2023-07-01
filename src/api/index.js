export const url = "https://f387-36-73-62-117.ngrok-free.app";
// export const url = "http://localhost:5000";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
