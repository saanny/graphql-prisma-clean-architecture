export type Dictionary<T> = { [key: string]: T };

export type SerializableObject = Dictionary<any>;
export function ofType<T>(value: T): T {
    return value;
}
