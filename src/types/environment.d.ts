declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production";
        APPWRITE_PROJECT_ID: string;
        APPWRITE_ENDPOINT: string;
        APPWRITE_PROJECT_API_KEY: string;
        VERCEL_URL?: string;
        NEXT_PUBLIC_VERCEL_URL?: string;
        FRONTEND_URL?: string;
        NEXT_PUBLIC_PAYPAL_CLIENT_ID?: string;
        PAYPAL_API?: string;
        NEXT_PUBLIC_PAYPAL_CLIENT_SECRET?: string;
        GEMINI_API_KEY?: string;
        ENABLE_PRICE_ESTIMATION?: string;
      }
    }
  }
  
  export {};