const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'djal',
      room: 'pandr'
    }, {
      id: '2',
      name: 'boat',
      room: 'pandr'
    }, {
      id: '3',
      name: 'red',
      room: 'pandr'
    }];
  });

  it('should add a user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Eric',
      room: 'alvvays'
    };
    let res = users.addUser(user.id, user.name, user.room);
    expect(users.users.length).toBe(1);
    expect(users.users).toEqual([user]);
  });

  it('should find a user', () => {
    let userId= '2';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should remove a user', () => {
    let userId = '2';
    let filteredUsers = users.removeUser(userId);
    expect(filteredUsers.length).toBe(2);
  });

  it('should not remove a user', () => {
    let userId ='4';
    let filteredUsers = users.removeUser(userId);
    expect(filteredUsers.length).toBe(3);
    expect(filteredUsers).toEqual(users.users);
  });

  it('should return the names for the users in a room', () => {
    let userList = users.getUserList('pandr');
    expect(userList.length).toBe(3);
    expect(userList).toEqual(['djal', 'boat', 'red']);
  });
});