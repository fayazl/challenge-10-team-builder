const Employee = require('../lib/Employee.js')

test('create Employee Object', () => {
    const employee = new Employee ('Test1','1', 'email1@gmail.com');

    expect(employee.name).toBe('Test1');
    expect(employee.id).toBe('1')
    expect(employee.email).toBe('email1@gmail.com');
});

test('get Employee name', () => {
    const employee = new Employee('Test2','2', 'email2@gmail.com');

    expect(employee.getName()).toEqual('Test2');
})

test('get ID number', () => {
    const employee = new Employee('Test3','3', 'email3@gmail.com');

    expect(employee.getID()).toEqual('3');
})

test('get Email address', () => {
    const employee = new Employee('Test4','4', 'email4@gmail.com');

    expect(employee.getEmail()).toEqual('email4@gmail.com');
})

test('get Employee Role', () => {
    const employee = new Employee('Test5','5', 'email5@gmail.com');

    expect(employee.getRole()).toEqual('Employee');
})

