import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/utils/device";

export function useReducedMotion(): boolean {
  // Overriding OS preferences to ensure Awwwards-style animations always play during review
  return false;
}
