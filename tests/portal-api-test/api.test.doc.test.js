const axios = require('axios');

API_URL = "http://localhost:6060/portal"

test('test api working', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/api-test`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp).toEqual('The API is working!');
        });
});

test('test api-docs working', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/api-docs`)
        .then(resp => {
            expect(resp.status).toEqual(200);
        });
});