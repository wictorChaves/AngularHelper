# Angular Module Federation (Micro Front-end)

## Versão suportadas

Angular 12: @angular-architects/module-federation: ^12.0.0
Angular 13: @angular-architects/module-federation: ~14.2.0
Angular 14: @angular-architects/module-federation: ^14.3.0
Angular 15: @angular-architects/module-federation: ^15.0.0
Angular 16: @angular-architects/module-federation: ^16.0.0

## Ajuda

[NPM Package](https://www.npmjs.com/package/@angular-architects/native-federation)
[Repository](https://github.com/angular-architects/module-federation-plugin)
[Homepage](https://github.com/angular-architects/module-federation-plugin#readme)

## Criando o projeto

### Shell

#### Instalação

```BATCH
ng new shell --routing=true --ssr=false --style=scss --no-standalone
cd shell
ng add @angular-architects/module-federation --project shell --type host --port 4200 --skip-confirmation 
```

shell\src\decl.d.ts
declare module 'mfe1/Module';
shell\src\app\app.routes.ts

shell\webpack.config.js 3000 -> 4201

### Micro Frontend

```BATCH
ng new micro-frontend --routing=true --ssr=false --style=scss --no-standalone
cd micro-frontend
ng add @angular-architects/module-federation --project micro-frontend --type remote --port 4201 --skip-confirmation
```

ng g m home
ng g c home --module=home/home.module.ts

micro-frontend\webpack.config.js
micro-frontend\src\app\home\home.routes.ts
 RouterModule.forChild(HOME_ROUTES)
---

mfe2\tsconfig.app.json


```JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

```JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts",
    "src/**/*.ts"
  ],
  "exclude": [
    "**/*.spec.ts"
  ]
}
```

## Troubleshooting

Erro

    Uncaught SyntaxError: Cannot use 'import.meta' outside a module

>When serving module federation apps in dev mode locally, there'll be an error output to the console, import.meta cannot be used outside of a module, and the script that is coming from is styles.js. It's a known error output, but it doesn't actually cause any breakages from as far >as our testing has shown. It's because Angular compiler attaches the styles.js file to the index.html in a script tag with defer.
>
>It needs to be attached with type=module, but Angular can't make that change because it breaks HMR. They also provide no way of hooking into that process for us to patch it ourselves.
>
>The good news is that the error doesn't propagate to production, because styles are compiled to a CSS file , so there's no erroneous JS to log an error.
>
>It's worth stressing that there's been no actual errors or breakages noted from our tests.

https://nx.dev/recipes/angular/dynamic-module-federation-with-angular#dashboard-application