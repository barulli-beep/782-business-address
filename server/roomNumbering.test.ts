import { describe, it, expect } from "vitest";
import { formatRoomNumber } from "./db";

describe("Room Numbering", () => {
  describe("formatRoomNumber", () => {
    it("should format room number 1 as 'Sl 01'", () => {
      expect(formatRoomNumber(1)).toBe("Sl 01");
    });

    it("should format room number 10 as 'Sl 10'", () => {
      expect(formatRoomNumber(10)).toBe("Sl 10");
    });

    it("should format room number 100 as 'Sl 100'", () => {
      expect(formatRoomNumber(100)).toBe("Sl 100");
    });

    it("should return empty string for null", () => {
      expect(formatRoomNumber(null)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(formatRoomNumber(undefined)).toBe("");
    });

    it("should return empty string for 0", () => {
      expect(formatRoomNumber(0)).toBe("");
    });

    it("should format room number 5 as 'Sl 05'", () => {
      expect(formatRoomNumber(5)).toBe("Sl 05");
    });

    it("should format room number 99 as 'Sl 99'", () => {
      expect(formatRoomNumber(99)).toBe("Sl 99");
    });
  });
});
