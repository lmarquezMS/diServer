declare module "webshot"{
  var webshot: Webshot;
  export = webshot;
}

interface Webshot{
  (url: string): Webshot; 
  (url: string, image: string, callback: any): Webshot;
  (url: string, config: any, callback: any): Webshot;
}
