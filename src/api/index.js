export const url = "https://f201-36-73-78-167.ngrok-free.app";
// export const url = "https://chaoo-todo-app.herokuapp.com/api";
// export const url = "http://localhost:5000";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
