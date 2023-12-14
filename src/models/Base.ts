type PrimitiveConstantIdent<S extends string> = `__${S}__`;
export type PrimitiveConstant<P, S extends string> = P & {
  [K in PrimitiveConstantIdent<S>]: never;
};
