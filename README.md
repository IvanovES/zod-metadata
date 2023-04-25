# zod-metadata
Metadata support for [Zod](https://www.npmjs.com/package/zod) schemas.

## Install
```bash
npm install zod-metadata
```

## Register the Zod extension

### Automatic
Import `zod-metadata/register` at the top of your entry files:

**JavaScript**
```javascript
require('zod-metadata/register');
```

**TypeScript**
```typescript
import 'zod-metadata/register';
```

### Manual
**JavaScript**
```javascript
const { register } = require('zod-metadata');
const zod = require('zod');

register(zod);
```

**TypeScript**
```typescript
import { register } from 'zod-metadata';
import zod from 'zod';

register(zod);
```

### Preload
**JavaScript**
```bash
node -r zod-metadata/register my-script.js
```

```javascript
// my-script.js
require('zod-metadata'); // make type declarations available
```

**TypeScript**
```bash
ts-node -r zod-metadata/register my-script.js
```

```typescript
// my-script.ts
import {} from 'zod-metadata'; // make type declarations available
```

## API
The API provides two methods that will read and write to `schema._def.meta`.

### `schema.meta(meta: Record<string, unknown>): this`
Accumulates metadata mutating the schema:

```javascript
schema
  .meta({ key1: value1 })
  .meta({ key2: value2 });
```

### `schema.getMeta(): Record<string, unknown>`
Returns the metadata:

```javascript
schema.getMeta(); // => { key1: value1, key2: value2 }
```

## Typings

To define global (default) typings for `.meta()` and `.getMeta()` calls (and so get autocompletion in your IDE), create a `<some-name>.d.ts` file in your project and override default IMeta interface, like this:

```typescript
import z from 'zod';

declare module 'zod' {
    interface IMeta {
        name: string;
        age?: number;
    }
}
```

To override default return type of a single `.getMeta()` call or define argument type of a single `.meta()` call, use optional generic arguments, like:

```typescript
z.string().meta<{city: string}>({city: 'New York'});
const city = z.string().getMeta<{city: string}>().city;
```
