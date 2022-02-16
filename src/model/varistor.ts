export interface unitsI {
  'mm': number,
  'cm': number,
  "m": number,
  'g': number,
  'kg': number,
  'kg/m3': number,
  'g/sm3': number,
}

export class Varistor {
  wetDiam!: number;
  wetDiamUnits!: keyof unitsI;
  wetHeight!: number;
  wetHeightUnits!: keyof unitsI;
  wetWeight!: number;
  wetWeightUnits!: keyof unitsI;
  wetDensity!: number;
  wetDensityUnits!: keyof unitsI;

  constructor(wetGeometry: Varistor) {
    for (let key in wetGeometry) {
      this[key as keyof Varistor] = wetGeometry[key];
    }
  }



}