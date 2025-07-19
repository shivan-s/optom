import { it, expect, describe } from "vitest";
import { Refraction } from ".";

describe("Refraction", () => {
	it("should work", () => {
		const refraction = new Refraction({ sph: 1 });
		expect(refraction).toBeDefined();
	});
});
