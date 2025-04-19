# zod-metadata

Metadata support for [Zod](https://www.npmjs.com/package/zod) schemas.

> [!WARNING]  
> Zod 4 introduced metadata support (see [docs](https://v4.zod.dev/v4#metadata)) and so there is no need for this package.

## Installation

```bash
npm install zod-metadata
yarn add zod-metadata
pnpm add zod-metadata
```

## Basic Usage

```typescript
import 'zod-metadata/register';
import { z } from 'zod';

const schema = z.string().meta({
  example: 'John',
  number: 42,
});

schema.getMeta(); // => { example: 'John', number: 42 }
```

## Registration

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

**Via NODE_OPTIONS**

```bash
NODE_OPTIONS='-r zod-metadata/register' node my-script.js
```

## Specifying the metadata shape

Since you can re-declare an interface to add stuff to it,
you can redeclare the `ZodMeta` interface to add fields to it.
This may be helpful if you have handful, pre-defined keys you're going to use project-wide.

![Overwritting the zod metadata interface](https://github.com/IvanovES/zod-metadata/blob/main/docs/images/project-wide-meta-type.png)
