declare module "twitter" {
  export class Twitter{
    constructor(config: any);
    get(path: any, params: any, callback: any);
    post(path: any, params: any, callback: any);
    stream(path: any, params: any, callback: any);
  }
}
