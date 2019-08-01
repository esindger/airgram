import { plainToClass } from 'class-transformer'

export type ClassType<T> = new (...args: any[]) => T
export type PlainObjectToModelTransformer = (plainObject: Record<string, any>) => ClassType<any> | Record<string, any>

export function useModels (
  models: Record<string, ClassType<any>>
): PlainObjectToModelTransformer {
  return (plainObject) => '_' in plainObject && models[plainObject._]
    ? plainToClass(models[plainObject._], plainObject)
    : plainObject
}
