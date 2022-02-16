import { useEffect } from "react";
import { useForm } from "react-hook-form";

import styles from './CreationGeometry.module.css'

export interface unitsI {
  'mm': number,
  'cm': number,
  "m": number,
  'g': number,
  'kg': number,
  'kg/m3': number,
  'g/sm3': number,
}


const units: unitsI = {
  'mm': 1000,
  'cm': 100,
  "m": 1,
  'g': 1,
  'kg': 1000,
  'kg/m3': 1,
  'g/sm3': 0.001,
}

export interface WetGeometryI {
  wetDiam: number;
  wetDiamUnits: keyof unitsI;
  wetHeight: number;
  wetHeightUnits: keyof unitsI;
  wetWeight: number;
  wetWeightUnits: keyof unitsI;
  wetDensity: number;
  wetDensityUnits: keyof unitsI;
}

export const CreationGeometry = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const calculation = (data: WetGeometryI) => {
    let field = '';
    let result = 0;
    if (data.wetDiam && data.wetHeight && data.wetWeight) {
      field = 'wetDensity';
      result = (data.wetWeight * units[data.wetWeightUnits]) / (Math.PI * Math.pow(data.wetDiam * units[data.wetDiamUnits] / 2, 2) * data.wetHeight * units[data.wetHeightUnits])
    }
    if (data.wetDiam && data.wetDensity && data.wetWeight) {
      field = 'wetHeight';
      result = (data.wetWeight * units[data.wetWeightUnits]) /  (Math.PI * Math.pow(data.wetDiam * units[data.wetDiamUnits] / 2, 2) * data.wetDensity * units[data.wetDensityUnits])
    }
    if (data.wetDiam && data.wetHeight && data.wetDensity) {
      field = 'wetWeight';
      result = data.wetDensity * units[data.wetDensityUnits] * (Math.PI * Math.pow(data.wetDiam * units[data.wetDiamUnits] / 2, 2) * data.wetHeight * units[data.wetHeightUnits])
    }
    if (data.wetDensity && data.wetHeight && data.wetDensity) {
      field = 'wetDiam';
      result = 2 * Math.sqrt(((data.wetWeight * units[data.wetWeightUnits]) / (data.wetDensity * units[data.wetDensityUnits]  * data.wetHeight * units[data.wetHeightUnits])) / Math.PI )
    }
    if (!field) {
      return;
    }
    console.log(field, result)
    setValue(field, result);
  }

  useEffect(() => {

      calculation(watch() as unknown as WetGeometryI);

  }, [watch])

  return (
    <section>
      <h1>Геометрия при создании</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>
            Геометрия варистора
          </legend>

          <div className={styles.row}>
           <input placeholder="Диаметр сырого" {...register("wetDiam")} />
            <select {...register("wetDiamUnits")}>
              <option value="mm">мм</option>
              <option value="sm">см</option>
              <option value="m">м</option>
            </select>
          </div>
           <div className={styles.row}>
           <input placeholder="Высота сырого" {...register("wetHeight")} />
            <select defaultValue='mm' {...register("wetHeightUnits")}>
              <option value="mm">мм</option>
              <option value="sm">см</option>
              <option value="m">м</option>
            </select>
          </div>
          <div className={styles.row}>
           <input placeholder="Масса сырого" {...register("wetWeight")} />
            <select {...register("wetWeightUnits")}>
              <option value="g">гр.</option>
            </select>
          </div>
          <div className={styles.row}>
           <input placeholder="Мокрая плотность" {...register("wetDensity")} />
            <select defaultValue='kg/m3' {...register("wetDensityUnits")}>
              <option value="kg/m3">кг/м³</option>
              <option value="g/sm3">г/см³</option>
            </select>
          </div>

          
        </fieldset>
       
        <input type="submit" />
      </form>
    </section>
  )
}