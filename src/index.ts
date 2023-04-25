import z from 'zod';

declare module 'zod' {
  interface IMeta {
    [k: string]: unknown;
  }

  interface ZodTypeDef {
    meta?: IMeta;
  }

  interface ZodType {
    getMeta<T = IMeta>(): T;
    meta<T = IMeta>(meta: T): this;
  }
}

export function register(zod: typeof z) {
  if (typeof zod.ZodType.prototype.meta !== 'undefined') {
    return;
  }

  zod.ZodType.prototype.meta = function (meta: Record<string, unknown>) {
    this._def.meta = { ...this._def.meta, ...meta };
    return this;
  };

  zod.ZodType.prototype.getMeta = function () {
    return this._def.meta;
  };
}
