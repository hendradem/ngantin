export const url = "https://537d-36-81-86-77.ngrok-free.app";
// export const url = "http://localhost:5000";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
