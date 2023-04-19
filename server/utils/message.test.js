import {expect} from 'expect';
import {
    generateMessage,
    generateLocationMessage
} from './message.js';

describe('Generate Message', () => {
    it('should generate correct message object', () => {
        const from = 'User';
        const text = 'Hello';
        const message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    })
})

describe('Generate Location Message', () => {
    it('should generate correct location object', () => {
        const from = 'Clara';
        const lat = 12;
        const lng = 15;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        const message = generateLocationMessage(from, lat, lng);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });
    })


})