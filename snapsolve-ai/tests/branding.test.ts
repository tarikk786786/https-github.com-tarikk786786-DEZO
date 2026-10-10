import { describe, expect, it } from "vitest";
import { BRAND } from "../src/storage/defaults";

describe("TarikIslam.in branding", () => {
  it("uses the required attribution and website", () => {
    expect(BRAND.attribution).toBe("Made by TarikIslam.in");
    expect(BRAND.website).toBe("https://tarikislam.in");
  });
});
