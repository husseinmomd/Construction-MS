import toast from "react-hot-toast";

export * from "./pagedUrlBuilder";
export * from "./css.config.tsx";
export function setInputDate(date?: string | null) {
  if (!date) return;
  return new Date(date.substring(0, 10)).toISOString().substring(0, 10);
}

export function UnAuthorized(message: string) {
  toast.error(message);
}
