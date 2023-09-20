const axios = require('axios');

API_URL = "http://localhost:6060/portal"

test('test pt src resource POST request', async () => {
    var testDoc =     {
        name: "week-1-test",
        week: 1,
        team: "PT",
        description: "week-1-test",
        time_taken_to_complete: "1",
        url: "https://example.com/"
    }
    const response = await axios.post(`${API_URL}/pt-src-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test pt src resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-src-resources/1/PT`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(1);
        })
});

test('test pt src resource DELETE request', async () => {
    var testDoc =     {
        name: "week-1-test",
        week: 1,
        team: "PT"
    }
    const response = await axios.delete(`${API_URL}/pt-src-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});

test('test pt src resource POST request', async () => {
    var testDoc =     {
        name: "week-2-test",
        week: 2,
        team: "SRC",
        description: "week-2-test",
        time_taken_to_complete: "1",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/pt-src-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test pt src resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-src-resources/2/SRC`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(2);
        })
});

test('test pt src resource DELETE request', async () => {
    var testDoc =     {
        name: "week-2-test",
        week: 2,
        team: "SRC"
    }
    const response = await axios.delete(`${API_URL}/pt-src-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});

test('test pt src resource POST request', async () => {
    var testDoc =     {
        name: "week-3-test",
        week: 3,
        team: "PT",
        description: "week-3-test",
        time_taken_to_complete: "1",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/pt-src-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test pt src resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-src-resources/3/PT`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(3);
        })
});

test('test pt src resource DELETE request', async () => {
    var testDoc =     {
        name: "week-3-test",
        week: 3,
        team: "PT"
    }
    const response = await axios.delete(`${API_URL}/pt-src-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});

