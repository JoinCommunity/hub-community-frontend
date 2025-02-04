import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default class Utils {
  static cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
