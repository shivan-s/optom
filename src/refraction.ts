interface RefractionParams {
	/** Sphere in dioptres */
	sph: number;
	/** Cylinder in dioptres */
	cyl?: number;
	/** Axis in degrees */
	axis?: number;
	/** Vertex distance in mm */
	vd?: number;
}

/**
 * Refraction
 */
class Refraction implements RefractionParams {
	#sph: number;
	#cyl: number;
	#axis: number;
	#vd: number;

	constructor(params: RefractionParams) {
		this.#sph = params.sph;
		this.#cyl = params.cyl ?? 0;
		this.#axis = params.cyl === 0 ? 0 : this.#normaliseAxis(params.axis ?? 180);
		this.#vd = params.vd ?? 12;
	}

	get rawSph(): number {
		return this.#sph;
	}
	get rawCyl(): number {
		return this.#cyl;
	}
	get rawAxis(): number {
		return this.#axis;
	}
	get rawVd(): number {
		return this.#vd;
	}

	get sph(): number {
		return this.#roundQuarterDioptre(this.#sph);
	}
	get cyl(): number {
		return this.#roundQuarterDioptre(this.#cyl);
	}
	get axis(): number {
		return Math.round(this.#axis);
	}
	get vd(): number {
		return Math.round(this.#vd);
	}

	static new(params: RefractionParams): Refraction {
		return new Refraction(params);
	}

	#roundQuarterDioptre(n: number) {
		return (n * 0.25) / 0.25;
	}

	#normaliseAxis(axis: number): number {
		return axis % 180;
	}

	display(): string {
		if (this.cyl === 0) {
			return `${this.sph > 0 ? "+" : ""}${this.sph} DS`;
		}
		return `${this.sph > 0 ? "+" : ""}${this.sph.toFixed(2)} / ${this.sph > 0 ? "+" : ""}${this.cyl.toFixed(2)} x ${this.axis}`;
	}

	transpose(): Refraction {
		const sph = this.sph + this.cyl;
		const cyl = -1 * this.cyl;
		const axis = this.#normaliseAxis(this.#axis + 90);
		return new Refraction({ sph, cyl, axis, vd: this.#vd });
	}

	#effectivity(pwr: number, vd?: number) {
		const e = pwr / (1 - (pwr * (vd ?? 0)) / 1000);
		return e;
	}

	ocularRx(): Refraction {
		const sph = this.#effectivity(this.sph);
		const cyl = this.#effectivity(this.sph + this.cyl);
		return new Refraction({ sph, cyl, axis: this.axis, vd: this.vd });
	}
}

export default Refraction;
