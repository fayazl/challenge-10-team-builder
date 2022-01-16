const Engineer = require('../lib/Engineer.js');

test('create Engineer Object', () => {
    const engineer = new Engineer ('Test1','1', 'email1@gmail.com', 'github1');

    expect(engineer.name).toBe('Test1');
    expect(engineer.id).toBe('1')
    expect(engineer.email).toBe('email1@gmail.com');
    expect(engineer.github).toBe('github1')
});

test('get github information', () => {
    const engineer = new Engineer ('Test2','2', 'email2@gmail.com', 'github2');

    expect(engineer.getGithub()).toBe('github2');
});

test('test getRole', () => {
    const engineer = new Engineer ('Test3','3', 'email3@gmail.com', 'github3');

    expect(engineer.getRole()).toBe('Engineer')
})