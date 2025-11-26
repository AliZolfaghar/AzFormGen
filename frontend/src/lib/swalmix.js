// alertQueue.js
import Swal from "sweetalert2";

class AlertQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(fn) {
    this.queue.push(fn);
    this.runNext();
  }

  async runNext() {
    if (this.running) return;
    const next = this.queue.shift();
    if (!next) return;

    this.running = true;
    await next();
    this.running = false;
    this.runNext();
  }
}

const alertQueue = new AlertQueue();

// ---------- Modal helpers ----------
const success = (message, title) => {
  alertQueue.add(() => Swal.fire({ title, text: message, icon: "success" }));
};
const warning = (message, title) => {
  alertQueue.add(() => Swal.fire({ title, text: message, icon: "warning" }));
};
const info = (message, title) => {
  alertQueue.add(() => Swal.fire({ title, text: message, icon: "info" }));
};
const error = (message, title) => {
  alertQueue.add(() => Swal.fire({ title, text: message, icon: "error" }));
};

// ---------- Toast helpers ----------
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const toastSuccess = (message) => {
  alertQueue.add(() => Toast.fire({ icon: "success", title: message }));
};
const toastWarning = (message) => {
  alertQueue.add(() => Toast.fire({ icon: "warning", title: message }));
};
const toastInfo = (message) => {
  alertQueue.add(() => Toast.fire({ icon: "info", title: message }));
};
const toastError = (message) => {
  alertQueue.add(() => Toast.fire({ icon: "error", title: message }));
};

// ---------- Prompt helper ----------
/**
 * نمایش یک یا چند input در modal
 * @param {string} title عنوان پنجره
 * @param {Array} inputs آرایه‌ای از inputها [{ name, placeholder, type }]
 * @returns Promise که شامل { isConfirmed, isDismissed, values } است
 */
const prompt = (title, inputs = []) => {
  return new Promise((resolve) => {
    alertQueue.add(async () => {
      const { isConfirmed, isDismissed, value } = await Swal.fire({
        title,
        html: inputs
          .map(
            (input, i) =>
              `<input id="swal-input-${i}" class="swal2-input" 
                type="${input.type || "text"}" 
                placeholder="${input.placeholder || ""}">`
          )
          .join(""),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return inputs.map((_, i) =>
            document.getElementById(`swal-input-${i}`).value
          );
        }
      });

      resolve({
        isConfirmed,
        isDismissed,
        values: value || []
      });
    });
  });
};

export default {
  success,
  warning,
  info,
  error,
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
  prompt
};
