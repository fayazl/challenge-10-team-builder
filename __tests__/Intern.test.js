const Intern = require('../lib/Intern.js');

test('create Intern Object', () => {
    const intern = new Intern ('Test1','1', 'email1@gmail.com', 'school1');

    expect(intern.name).toBe('Test1');
    expect(intern.id).toBe('1')
    expect(intern.email).toBe('email1@gmail.com');
    expect(intern.school).toBe('school1')
});

test('get school information', () => {
    const intern = new Intern ('Test2','2', 'email2@gmail.com', 'school2');

    expect(intern.getSchool()).toBe('school2');
});

test('test getRole', () => {
    const intern = new Intern ('Test3','3', 'email3@gmail.com', 'school3');

    expect(intern.getRole()).toBe('Intern');
});