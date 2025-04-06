import { createreferaliddef } from './Referal/createreferalid';
import { getOrCreateReferalIdDef } from './Referal/getOrCreateReferalId';
import { getreferaliddef } from './Referal/getreferalid';
import { getreferalsdef } from './Referal/getreferals';
import { getrefereddef } from './Referal/getrefered';
import { iscoderealdef } from './Referal/isreferalcodereal';

export class Referal {
    static createreferalid = createreferaliddef;
    static getreferals = getreferalsdef;
    static getreferalid = getreferaliddef;
    static getrefered = getrefereddef;
    static getOrCreateReferalId = getOrCreateReferalIdDef;
    static iscodereal = iscoderealdef;
    }