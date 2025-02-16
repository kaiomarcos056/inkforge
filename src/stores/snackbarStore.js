import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
  }),
  actions: {
    triggerSnackbar(message) {
      this.message = message;
      this.show = true;
    },
    closeSnackbar() {
      this.show = false;
    },
  },
});
