const Manager = require('../lib/Manager.js');

test('create Manager Object', () => {
    const manager = new Manager ('Test1','1', 'email1@gmail.com', '123');

    expect(manager.name).toBe('Test1');
    expect(manager.id).toBe('1')
    expect(manager.email).toBe('email1@gmail.com');
    expect(manager.office).toBe('123')
});

test('get Office number', () => {
    const manager = new Manager ('Test2','2', 'email2@gmail.com', '1234');

    expect(manager.office).toBe('1234')
})

test('test getRole', () => {
    const manager = new Manager ('Test3','3', 'email3@gmail.com', '12345');

    expect(manager.getRole()).toBe('Manager')
})