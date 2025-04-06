import { askdoubtdef } from "./assignments/askdoubt";
import { downloaddef } from "./assignments/download";
import { previewassdef } from "./assignments/downloadass";
import { downloadassdef } from "./assignments/downloadbucket";
import { getassignmentdef } from "./assignments/getassignment";
import { getassignmentsdef } from "./assignments/getassignments";
import {  getdoubtDef } from "./assignments/getdoubts";
// import { estimateProjectPrice } from "./assignments/getpriceprediction";
import { uploaddef } from './assignments/upload';

export class Assignment {
    static getassignments = getassignmentsdef;
    static upload = uploaddef;
    static askdoubts = askdoubtdef;
    static getdoubts = getdoubtDef;
    static download = downloaddef;
    static downloadass = downloadassdef;
    static previewass = previewassdef;
    static getassigenment = getassignmentdef;
    // static priceprediction = estimateProjectPrice;
}