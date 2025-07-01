"use server";

import { headers } from "next/headers";

export const getWebsiteOriginURL = async() => {
    try {
        const headersStore = await headers();

        // Try multiple header combinations for different deployment environments
        const origin = headersStore.get("x-forwarded-host") || 
                      headersStore.get("host") || 
                      process.env.VERCEL_URL ||
                      process.env.NEXT_PUBLIC_VERCEL_URL;
        
        const protocol = headersStore.get("x-forwarded-proto") || 
                        headersStore.get("x-forwarded-protocol") ||
                        (process.env.NODE_ENV === "production" ? "https" : "http");

        if (!origin) {
            // Check environment variables from .env files
            if (process.env.FRONTEND_URL) {
                return process.env.FRONTEND_URL;
            }
            
            // Fallback to localhost for development
            if (process.env.NODE_ENV === "development") {
                return "http://localhost:3000";
            }
            throw new Error("No origin found in headers or environment variables");
        }

        // Ensure we have a protocol
        const finalProtocol = protocol || "https";
        
        // Remove protocol if it's already in the origin
        const cleanOrigin = origin.replace(/^https?:\/\//, '');
        
        return `${finalProtocol}://${cleanOrigin}`;
        
    } catch (error) {
        console.error("Error getting website origin:", error);
        
        // Fallback strategies - check .env variables first
        if (process.env.FRONTEND_URL) {
            console.log("Using FRONTEND_URL from environment:", process.env.FRONTEND_URL);
            return process.env.FRONTEND_URL;
        }
        
        if (process.env.NODE_ENV === "development") {
            return "http://localhost:3000";
        }
        
        // For production, try to construct from VERCEL_URL or throw
        if (process.env.VERCEL_URL) {
            return `https://${process.env.VERCEL_URL}`;
        }
        
        if (process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL !== "localhost") {
            return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }
        
        throw new Error("Unable to determine website origin URL");
    }
}