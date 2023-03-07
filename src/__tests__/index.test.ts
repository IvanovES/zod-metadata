import zod from 'zod';
import { register } from '../index';

describe('register', () => {
  it('should be defined', () => {
    expect(register).toBeDefined();
  });

  describe('when called', () => {
    beforeAll(() => {
      register(zod);
    });

    it('should add a meta function to the argument prototype', () => {
      expect(zod.ZodType.prototype.meta).toBeDefined();
    });

    it('should add a getMeta function to the argument prototype', () => {
      expect(zod.ZodType.prototype.getMeta).toBeDefined();
    });

    describe('meta', () => {
      let schema: zod.ZodType;
      
      beforeEach(() => {
        schema = zod.string();
      });

      it('should mutate the schema', () => {
        expect(schema.meta({ a: 1 })).toBe(schema);
      });

      it('should append the information', () => {
        schema.meta({ a: 1 }).meta({ b: 2 });
        expect(schema.getMeta()).toEqual({ a: 1, b: 2 });
      });

      it('should overwrite existing keys', () => {
        schema.meta({ a: 1 });
        expect(schema.getMeta()).toEqual({ a: 1 });
        schema.meta({ a: 2 });
        expect(schema.getMeta()).toEqual({ a: 2 });
      });

      it('should not mutate its argument', () => {
        const meta1 = { a: 1 };
        const meta2 = { b: 2 };
        schema.meta(meta1).meta(meta2);
        expect(meta1).toEqual({ a: 1 });
        expect(meta2).toEqual( { b: 2 });
        expect(schema.getMeta()).toEqual({ a: 1, b: 2 });
      });

      it('should attach the meta to the schema\'s _def property', () => {
        const meta = { a: 1, b: '2' };
        schema.meta(meta);
        expect(schema._def.meta).toEqual(meta);
      });
    });

    describe('getMeta', () => {
      it('should return the meta', () => {
        const schema = zod.string();
        schema.meta({ a: 1 }).meta({ b: '2' });
        expect(schema.getMeta()).toEqual({ a: 1, b: '2' });
      });
    });

    describe('and then called again', () => {
      let initialMeta: typeof zod.ZodType.prototype.meta;
      let initialGetMeta: typeof zod.ZodType.prototype.getMeta;

      beforeAll(() => {
        initialMeta = zod.ZodType.prototype.meta;
        initialGetMeta = zod.ZodType.prototype.getMeta;
        register(zod);
      })

      it('should not redefine meta and getMeta', () => {
        expect(initialMeta).toBe(zod.ZodType.prototype.meta);
        expect(initialGetMeta).toBe(zod.ZodType.prototype.getMeta);
      });
    });
  });
});
