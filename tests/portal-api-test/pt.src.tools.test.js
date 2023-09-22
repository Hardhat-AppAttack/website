const axios = require('axios');

API_URL = "http://localhost:6060/portal"

test('test pt src tools resource POST request', async () => {
    var testDoc =     {
        name: "week-1-test",
        week: 1,
        team: "PT",
        os: "windows",
        description: "week-1-test",
        url: "https://example.com/"
    }
    const response = await axios.post(`${API_URL}/pt-src-tools-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test pt src tools resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/pt-src-tools-resources/1/PT`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(1);
        })
});

test('test pt src tools resource DELETE request', async () => {
    var testDoc =     {
        name: "week-1-test",
        week: 1,
        team: "PT"
    }
    const response = await axios.delete(`${API_URL}/pt-src-tools-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});