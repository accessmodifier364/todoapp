# ISU Corp Coding Test

## Prerequisites

- [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Node.js 18.x](https://nodejs.org/en/download/)
- [Angular 16.x CLI](https://www.npmjs.com/package/@angular/cli/v/16.0.0)

## Testing

To run .NET tests, run the following command in the root directory:

```bash
dotnet test
```

To run Angular tests, run the following command in the `todoapp.client` directory:

```bash
ng test
```

## Running

To run the application, run the following commands in the root directory:

```bash
dotnet run --project TodoApp.Server
```

This will start the development server on `http://localhost:5290` by default.
Accessing this URL in your browser will start running the SPA proxy. You will get automatically redirected to the Angular application once the proxy is ready.

---

To reset the database, simply stop running the application and delete the database file located at `TodoApp.Server/Backend.db`

For security purposes, you should change the JWT encryption token located at ``./TodoApp.Server/appsettings.json`` with a randomly generated Base64 string with at least 32 characters.