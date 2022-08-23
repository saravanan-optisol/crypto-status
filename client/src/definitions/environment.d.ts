declare module "environment" {
  import DevelopmentEnvironment from "environments/DevelopmentEnvironment";
  const value: ReturnType<typeof DevelopmentEnvironment>;

  export default value;
}
