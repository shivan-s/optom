import { it, expect, describe } from "vitest";
import { Refraction } from ".";

describe("Refraction", () => {
	it("should work", () => {
		const refraction = new Refraction({ sph: 1 });
		expect(refraction).toBeDefined();
	});

	it.each([{ input: { sph: 1 }, expected: "+1.00DS" }])(
		"should display() correctly",
		({ input, expected }) => {
			const r = Refraction.new(input);
			expect(r.display()).toBe(expected);
		},
	);
});
