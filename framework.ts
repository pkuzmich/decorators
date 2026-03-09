import express, { Application } from "express";

const app: Application = express();
const port = 3000;
const pathForController = new Map<any, string>();

export function Controller(urlPath: string) {
  return function (target: any, context: any) {
    console.log(`@Controller ${context.name} is registered at ${urlPath}`);
    pathForController.set(target, urlPath);
    return target;
  };
}

export function Get(subPath: string) {
  return function (target: any, context: any) {
    console.log(`@Get - registering a GET handler for controller: ${target.constructor.name}`);

    context.addInitializer(function (this: any): void {
      const controllerPath = pathForController.get(this.constructor);

      if (!controllerPath) {
        throw new Error(`Controller for type ${this.constructor.name} not registered`);
      }

      const fullPath = controllerPath + subPath;

      app.get(fullPath, (req, res) => {
        const endpointResponse = target.call(this);
        res.json(endpointResponse);
      });
    });
    return target;
  };
}

export function startApp() {
  console.log("Starting app");

  for (const controller of pathForController.keys()) {
    const _ = new controller();
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
