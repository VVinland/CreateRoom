import { expect } from 'expect';
import { User } from './users.js';

let users;

beforeEach(() => {
    users = new User();
    users.users =[{
        id: '1',
        name: 'Daniil',
        room: 'The office fans'
    }, {
        id: '2',
        name: 'Gysev',
        room: 'The office fans'
    }, {
        id: '3',
        name: 'Irina',
        room: 'Mama'
    }]
})

describe('Users', () => {
    it('Should add new user', () => {
        const users = new User();
        const user = {
            id: 'ddsad',
            name: 'Daniil',
            room: 'The office fans'
        }
        const reUser = users.addUser(user.id, user.name, user.room);
        expect(reUser).toMatchObject(user);
        expect(users.users).toEqual([user]);
    })

    it('should return names for the office fans', () => {
        const userList = users.getUserList('The office fans');

        expect(userList).toEqual(['Daniil', 'Gysev'])
    })

    it('should return names for the mama', () => {
        const userList = users.getUserList('Mama');

        expect(userList).toEqual(['Irina'])
    })

    it('should find user',()=>{
        const userID = '2';
        const user = users.getUser(userID); 

        expect(user.id).toBe(userID);
    })

    it('should not find user',()=>{
        const userID = '225';
        const user = users.getUser(userID); 

        expect(user).toBeUndefined();
    })

    it('should remove a user',()=>{
        const userID = '1';
        const user = users.removeUser(userID);
        expect(user.id).toBe(userID)
        expect(users.users.length).toBe(2);
    })

    it('should not remove a user',()=>{
        const userID = '108';
        const user = users.removeUser(userID);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    })
})