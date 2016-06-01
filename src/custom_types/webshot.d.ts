declare module "webshot"{
  var webshot: Webshot;
  export = webshot;
}

interface Webshot{
  (url: string, image: string, callback: any): Webshot;
  (url: string, config: any): Webshot;
}
