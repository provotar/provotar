export default defineNuxtPlugin(() => {
  return {
    provide: {
      openModal: (modal) => {
        modal.isOpen = true;
        document.body.style.overflow = "hidden";
      },
      closeModal: (modal) => {
        modal.isOpen = false;
        document.body.style.overflow = "";
      },
    },
  };
});
