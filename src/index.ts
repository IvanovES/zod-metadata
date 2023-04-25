import z from 'zod';

declare module 'zod' {
  interface ZodMeta {
    [k: string | number | symbol]: unknown;
  }

  interface ZodTypeDef {
    meta?: ZodMeta;
  }

  interface ZodType<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Output = any,
    Def extends z.ZodTypeDef = z.ZodTypeDef,
    Input = Output
  > {
    getMeta(): this['_def'] extends { meta: infer M } ? M : ZodMeta | undefined;
    meta<T extends ZodMeta = ZodMeta>(
      meta: T
    ): ZodType<
      Output,
      Def extends { meta: infer M } ? Def & { meta: M & T } : Def & { meta: T },
      Input
    >;
  }
}

export function register(zod: typeof z) {
  if (typeof zod.ZodType.prototype.meta !== 'undefined') {
    return;
  }

  zod.ZodType.prototype.meta = function (meta: z.ZodMeta) {
    this._def.meta = { ...this._def.meta, ...meta };
    return this;
  };

  zod.ZodType.prototype.getMeta = function () {
    return this._def.meta;
  };
}
