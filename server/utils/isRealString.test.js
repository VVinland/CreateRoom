import {expect} from 'expect';
import { isRealString } from "./isRealString.js";

describe('is Real String', () => {
    it('should reject non-string values', () => {
        const res = isRealString(98);
        expect(res).toBe(false)
    })
    it('should reject string with only spaces', () => {
        const res = isRealString('     ');
        expect(res).toBe(false);
    })
    it('should allow string with non-space chars', () => {
        const res = isRealString('    Abb      ');
        expect(res).toBe(true); 
    })
})