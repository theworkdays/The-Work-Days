import { NextResponse } from "next/server";

import { Referal } from "@/services/Referal.service"

export const GET =async ()=>{
    const res = await Referal.getOrCreateReferalId();
    return NextResponse.json(res);
}