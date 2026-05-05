import type { KeyboardEvent } from "react";

export const blockEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}
