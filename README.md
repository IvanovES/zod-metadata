# zod-metadata

Metadata support for [Zod](https://www.npmjs.com/package/zod) schemas.

## Installation

```bash
npm install zod-metadata
yarn add zod-metadata
pnpn add zod-metadata
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
