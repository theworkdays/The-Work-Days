"use server";

export async function createPayPalOrder(amount: string) {
    console.log("Creating PayPal order with amount:", amount);

    const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    console.log("Authorization header:", auth);  // Log the auth header for debugging
    console.log("PayPal API URL:", process.env.PAYPAL_API);  // Log the PayPal API URL
    console.log("PayPal Client ID:", process.env.PAYPAL_CLIENT_ID);  // Log the PayPal Client ID for debugging
    console.log("PayPal Client Secret:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET);  // Log the PayPal Client Secret for debugging
    try {
        const res = await fetch(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: amount,  // Dynamically passed amount
                        },
                    }
                ]
            }),
        });

        if (!res.ok) {
            console.error("Error from PayPal API:", res.status, res.statusText);
            throw new Error(`PayPal API error: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Response from PayPal:", data);

        return data;  // Return the PayPal order details (for further processing)

    } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw error;  // Re-throw the error so the caller can handle it
    }
}
