type R = {
  sph: number;
  cyl: number;
  axis: number;
  vd?: number;
};

class Refraction {
  #sph: number;
  #cyl: number;
  #axis: number;
  #vd: number;

  constructor(params: { sph: number; cyl: number; axis: number; vd?: number }) {
    this.#sph = params.sph;
    this.#cyl = params.cyl;
    this.#axis = this.#normaliseAxis(params.axis);
    this.#vd = params.vd ?? 12;
  }

  get sph(): number {
    return this.#sph;
  }
  get cyl(): number {
    return this.#cyl;
  }
  get axis(): number {
    return this.#axis;
  }
  get vd(): number {
    return this.#vd;
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
    const e = pwr / (1 - pwr * (vd ?? 0));
    return e;
  }

  ocularRx(): Refraction {
    const sph = this.#effectivity(this.sph);
    const cyl = this.#effectivity(this.sph + this.cyl);
    return new Refraction({ sph, cyl, axis: this.axis, vd: this.vd });
  }
}
