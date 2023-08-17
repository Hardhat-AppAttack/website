const axios = require('axios');

API_URL = "http://localhost:5000/portal"

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

test('test beginner resource POST request', async () => {
    var testDoc =     {
        name: "beginner-test",
        level: 0,
        description: "beginner-test",
        time_taken_to_complete: "1",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/pt-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test beginner resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-resources/beginner`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].level).toEqual(0);
        })
});

test('test beginner resource DELETE request', async () => {
    var testDoc =     {
        name: "beginner-test",
        level: 0
    }
    const response = await axios.delete(`${API_URL}/pt-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});

test('test intermediate resource POST request', async () => {
    var testDoc =     {
        name: "intermediate-test",
        level: 1,
        description: "intermediate-test",
        time_taken_to_complete: "1",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/pt-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test intermediate resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-resources/intermediate`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].level).toEqual(1);
        })
});

test('test intermediate resource DELETE request', async () => {
    var testDoc =     {
        name: "intermediate-test",
        level: 1
    }
    const response = await axios.delete(`${API_URL}/pt-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});

test('test advanced resource POST request', async () => {
    var testDoc =     {
        name: "advanced-test",
        level: 2,
        description: "advanced-test",
        time_taken_to_complete: "1",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/pt-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test advanced resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-resources/advanced`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].level).toEqual(2);
        })
});

test('test advanced resource DELETE request', async () => {
    var testDoc =     {
        name: "advanced-test",
        level: 2
    }
    const response = await axios.delete(`${API_URL}/pt-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});