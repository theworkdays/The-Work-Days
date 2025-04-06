import { capturePayPalOrderdef } from "./payment/capture";
import { createPayPalOrder } from "./payment/payment";

export class payment{
    static capturePaypalorder = capturePayPalOrderdef
    static createpaypalorder  = createPayPalOrder
}