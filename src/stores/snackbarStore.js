import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
    status: "success",
  }),
  actions: {
    triggerSnackbar(message) {
      this.message = message;
      this.show = true;
    },
    closeSnackbar() {
      this.show = false;
    },
    abrirSnackbar(message, status){
      this.message = message;
      this.status = status;
      this.show = true;
    }
  },
});
