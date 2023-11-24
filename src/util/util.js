import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { atom } from "jotai";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

export const nameAtom = atom("");
export const addressAtom = atom("");
export const phoneAtom = atom("");
export const petsAtom = atom([]);
export const adoptPetAtom = atom("");
