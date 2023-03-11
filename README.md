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
