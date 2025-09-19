import { atom } from "jotai";

export type Role = "ADMIN" | "SELLER" | "CUSTOMER" | null;

export const authTokenAtom = atom<string | null>(null);
export const roleAtom = atom<Role>(null);
export const userAtom = atom<{ id: string; name: string; email: string } | null>(null);
