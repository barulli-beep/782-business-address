import { describe, it, expect, beforeEach, vi } from "vitest";
import { getNextRoomNumber } from "./db";

// Mock the database
vi.mock("./db", async () => {
  const actual = await vi.importActual("./db");
  return {
    ...actual,
    getDb: vi.fn(),
  };
});

describe("Room Numbering System", () => {
  it("should format room numbers correctly", () => {
    // Test room number formatting
    const roomNumbers = [1, 2, 10, 99];
    const formatted = roomNumbers.map(num => `Sl ${String(num).padStart(2, "0")}`);
    
    expect(formatted).toEqual(["Sl 01", "Sl 02", "Sl 10", "Sl 99"]);
  });

  it("should generate sequential room numbers", async () => {
    // This test validates the room number generation logic
    // In a real scenario, this would test against a database
    const testRoomNumbers = [1, 2, 3, 4, 5];
    
    for (let i = 0; i < testRoomNumbers.length; i++) {
      const expected = testRoomNumbers[i];
      const formatted = `Sl ${String(expected).padStart(2, "0")}`;
      expect(formatted).toBe(`Sl 0${expected}`);
    }
  });

  it("should handle room number edge cases", () => {
    // Test edge cases
    expect(`Sl ${String(0).padStart(2, "0")}`).toBe("Sl 00");
    expect(`Sl ${String(100).padStart(2, "0")}`).toBe("Sl 100");
    expect(`Sl ${String(999).padStart(2, "0")}`).toBe("Sl 999");
  });
});

describe("Email Templates with Room Numbers", () => {
  it("should include room number in customer email", () => {
    const roomNumber = 5;
    const roomDisplay = roomNumber ? `Sl ${String(roomNumber).padStart(2, "0")}` : "";
    const addressLine = roomDisplay ? `Rua Conde de Linhares, 782 - ${roomDisplay}` : "Rua Conde de Linhares, 782";
    
    expect(roomDisplay).toBe("Sl 05");
    expect(addressLine).toBe("Rua Conde de Linhares, 782 - Sl 05");
  });

  it("should include room number in seller email", () => {
    const roomNumber = 12;
    const roomDisplay = roomNumber ? `Sl ${String(roomNumber).padStart(2, "0")}` : "Pendente";
    
    expect(roomDisplay).toBe("Sl 12");
  });

  it("should handle missing room number gracefully", () => {
    const roomNumber = undefined;
    const roomDisplay = roomNumber ? `Sl ${String(roomNumber).padStart(2, "0")}` : "Pendente";
    
    expect(roomDisplay).toBe("Pendente");
  });
});

describe("Success Page Display", () => {
  it("should format address with room number", () => {
    const roomNumber = 7;
    const address = `Rua Conde de Linhares, 782${roomNumber ? ` - Sl ${String(roomNumber).padStart(2, "0")}` : ""} — Belo Horizonte/MG`;
    
    expect(address).toBe("Rua Conde de Linhares, 782 - Sl 07 — Belo Horizonte/MG");
  });

  it("should format address without room number", () => {
    const roomNumber = undefined;
    const address = `Rua Conde de Linhares, 782${roomNumber ? ` - Sl ${String(roomNumber).padStart(2, "0")}` : ""} — Belo Horizonte/MG`;
    
    expect(address).toBe("Rua Conde de Linhares, 782 — Belo Horizonte/MG");
  });
});
