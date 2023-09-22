const axios = require('axios');

API_URL = "http://localhost:6060/portal"

test('test web dev tool resource POST request', async () => {
    var testDoc =     {
        name: "web dev tool test",
        week: 1,
        description: "week-1-test",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/web-dev-tools-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test web dev tool resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/web-dev-tools-resources/1`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(1);
        })
});

test('test web dev tool resource DELETE request', async () => {
    var testDoc =     {
        name: "web dev tool test",
        week: 1,
    }
    const response = await axios.delete(`${API_URL}/web-dev-tools-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});
