import { getWebsiteOriginURL } from "./getWebsiteOrigin";

export class Url {
    // static get currentURL() {
      // !---------------------This is DEPRECATED---------------------!
      // !---------------------This is DEPRECATED---------------------!
      // !---------------------This is DEPRECATED---------------------!
      // !---------------------This is DEPRECATED---------------------!
    //     const url = process.env.NEXT_PUBLIC_VERCEL_URL; // this doesnt contain protocol like http:// or https://
    //     // check if its localhost since its the starts with localhost and ensure its not a domain like localhost.*.*
    //     //console.log(url);
        
    //     if (url.startsWith("localhost") && !url.match(/localhost\.\w+\.\w+/)) {
    //       return `http://${url}:${process.env.PORT}`;
    //     } else {
    //       return `https://${url}`;
    //     }
    // }
    static async extendURL(...args: string[]) {
      const currentURL = await getWebsiteOriginURL();





        return new URL(args.join("/"), currentURL).toString();
    }
  
}