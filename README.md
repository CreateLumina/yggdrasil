# Yggdrasil for MCLC

<a href="https://npm.im/@mclc/yggdrasil"><img height="56" src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/available/npm_vector.svg"></a>
<a href="https://discordlookup.com/user/684472142804549637"><img height="56" src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/social/discord-singular_vector.svg"></a>

This package is designed to work with [MCLC](https://npm.im/minecraft-launcher-core) to add Yggdrasil support.

## Installation

```bash
# npm
npm i minecraft-launcher-core

# Yarn
yarn add minecraft-launcher-core

# pnpm
pnpm add minecraft-launcher-core
```

## Usage

```js
import Yggdrasil from '@mclc/yggdrasil';
import { Client } from 'minecraft-launcher-core';
import { v4 } from 'uuid';

const auth = new Yggdrasil('https://url.to/yggdrasil/authserver');
const authorization = await auth.authenticate({
    username: 'john@example.com',
    password: 'password',
    clientToken: v4(),
});

const client = new Client({
    // These arguments are only for the authentication
    authorization,
    customArgs: ['-javaagent:/path/to/authlib-injector.jar=https://url.to/yggdrasil'],
});

client.launch();
```
