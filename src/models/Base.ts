type PrimitiveConstantIdent<S extends string> = `__${S}__`;
export type PrimitiveConstant<P extends unknown, S extends string> = P & {
  [K in PrimitiveConstantIdent<S>]: never;
};
