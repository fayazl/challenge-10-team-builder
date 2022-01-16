const Intern = require('../lib/Intern.js');

test('create Engineer Object', () => {
    const engineer = new Engineer ('Test1','1', 'email1@gmail.com', 'github1');

    expect(engineer.name).toBe('Test1');
    expect(engineer.id).toBe('1')
    expect(engineer.email).toBe('email1@gmail.com');
    expect(engineer.github).toBe('github1')
});