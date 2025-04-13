import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-dark/dark.css";

export const MySwal = withReactContent(
  Swal.mixin({
    background: "#0a0a0f",
    color: "#e5e7eb",
    customClass: {
      confirmButton:
        "bg-neon-purple hover:bg-neon-blue !text-white !font-bold !py-2 !px-6 !rounded-full",
      cancelButton:
        "bg-gray-600 hover:bg-gray-500 !text-white !font-bold !py-2 !px-6 !rounded-full",
    },
  })
);
