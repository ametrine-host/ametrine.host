# Ametrine.host
A modular backend for the Ametrine billing panel based on B1tt's backend.  
Every module is an isolated process, providing safe-uptime for the backend.

## Required:

- node version 16 and higher


## Starting the backend
### Official release:
```bash
pm2 start index.js #[REQUIRES PM2] (recommended)
#or
node index.js
```
### When downloading the code:
```bash
npm run i #install dependencies
npm run build #build the backend
npm run start #to run with pm2 [REQUIRES PM2 ON THE MACHINE]
#or
npm run nstart #to run with node
#custom: start the file dist/index.js with any process manager
```

## Adding modules

### Production:
1. Add the module's official release into the `./modules/` directory. For instance:
```
modules
└───website
    │   config.json
    │   module.json
    │
    └───src
            index.ts
            ...
    ...
```
2. Restart the backend
3. Upon startup, the installed module(s) should be working.

### Development:
It is recommended to keep modules in their respective repositories for readability/discovery reasons.  
**IMPORTANT: During the build process, tsconfig.json will ignore anything in the modules directory.** (this is to prevent errors during build-time with modules using different build techniques). To disable this feature, edit the tsconfig.json `exclude` rule.

```jsonc
//module.json
{
    "name": "Module name", //[REQUIRED]
    "author": "Author",
    "version": 1.0,
    "color": "125", //Ansi color code [REQUIRED]
    "file": "website/src/index.js", //Absolute path to module's main file [REQUIRED]
    "repository": "github.com/ametrine-host/ametrine.host-go" //Your module's repository (optional)
}
```

## TODO: KEEP THIS UPDATED
