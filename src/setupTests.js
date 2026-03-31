import "@testing-library/jest-dom";
import { vi } from "vitest";

// Map jest to vi globally since some tests might have "jest."
globalThis.jest = vi;
