# Angular Native Federation (Micro Front-end)

## TO DO (Testes)

 - Implementar bibliotecas para importar tipografia, cores e algum componente.
 - Criar um projeto base para ser copiado.

## Versão suportadas

Use version 16.1.x for Angular 16.1.x
Use version 16.2.x for Angular 16.2.x
Use version 17.x for Angular 17.x
Use version 17.1.x for Angular 17.1+

## Porque não usar Module Federation

[Parou na versão 16 a atualização do Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation#which-version-to-use), e há planos para [migrar para o Native Federation](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/native-federation/migrate-appbuilder.md).

## Ajuda

[NPM Package](https://www.npmjs.com/package/@angular-architects/native-federation)
[Repository](https://github.com/angular-architects/module-federation-plugin)
[Homepage](https://github.com/angular-architects/module-federation-plugin/tree/main/libs/native-federation)

## Criando e configurando os projetos

Vamos criar um projeto pai chamado "shell" e um projeto filho chamado "micro-frontend".

### Shell

#### Instalação

```BATCH
ng new shell --routing=true --ssr=false --style=scss --no-standalone
cd shell
npm i @angular-architects/native-federation -D
ng g @angular-architects/native-federation:init --project shell --port 4200 --type dynamic-host
```

#### Configuração

Altere o arquivo `shell\src\assets\federation.manifest.json`, colocando na chave o nome do projeto filho e seguido do seu endereço mais `/remoteEntry.json`

```JSON
{
  "micro-frontend": "http://localhost:4201/remoteEntry.json"
}
```

Altere o arquivo `shell\src\app\app-routing.module.ts` adicionando uma nova rota como no exemplo abaixo, `micro-frontend` é o nome do projeto filho, o mesmo informado na chave do arquivo `shell\src\assets\federation.manifest.json`, `./Module` é o caminho informado na chave do arquivo `micro-frontend\federation.config.js` do projeto filho e `HomeModule` é o nome do modulo que será carregado ao acessar esta rota no projeto pai.

```JSON
{
  path: '',
  loadChildren: () => loadRemoteModule('micro-frontend', './Module').then((m) => m.HomeModule)
}
```

### Micro Frontend

#### Instalação

```BATCH
ng new micro-frontend --routing=true --ssr=false --style=scss --no-standalone
cd micro-frontend
npm i @angular-architects/native-federation -D
ng g @angular-architects/native-federation:init --project micro-frontend --port 4201 --type remote
```

#### Configuração

Criando um novo componente e o seu modulo para exportar.

```BATCH
ng g m home
ng g c home --module=home/home.module.ts
```

Vamos adicionar nos `imports` do arquivo `micro-frontend\src\app\app.module.ts` do projeto, assim o projeto conseguirar usar o modulo independente do pai.

```Typescript
@NgModule({
  ...
  imports: [
    ...
    HomeModule
  ],
  ...
})
export class AppModule { }
```

Criar um arquivo de rota do modulo, `micro-frontend\src\app\home\home.routes.ts`.

```Typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];
```

Adicionar a rota no modulo, `micro-frontend\src\app\home\home.module.ts`.

```Typescript
@NgModule({
  ...
  imports: [
    ...
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule { }
```

## Executando

Agora basta executar o comando `ng serve` em ambos os projetos.