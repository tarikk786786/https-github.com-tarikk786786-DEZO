import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND } from "../src/storage/defaults";

describe("TarikIslam.in branding", () => {
  it("uses the required attribution and website", () => {
    expect(BRAND.attribution).toBe("Made by TarikIslam.in");
    expect(BRAND.website).toBe("https://tarikislam.in");
  });
});

describe("public SEO surfaces", () => {
  it("points the manifest homepage at the public product page", () => {
    const manifest = JSON.parse(
      readFileSync(resolve(__dirname, "../manifest.json"), "utf8")
    ) as { homepage_url?: string; description?: string; short_name?: string };
    expect(manifest.homepage_url).toBe("https://dezo.in/snapsolve");
    expect(manifest.short_name).toBe("SnapSolve");
    expect(manifest.description?.length).toBeLessThanOrEqual(132);
    expect(manifest.description?.toLowerCase()).toContain("free");
  });
});
