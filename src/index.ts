import z from 'zod';

declare module 'zod' {
  interface ZodTypeDef {
    meta?: Record<string, unknown>;
  }

  interface ZodType {
    getMeta(): Record<string, unknown>;
    meta(meta: Record<string, unknown>): this;
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
