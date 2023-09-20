const axios = require('axios');

API_URL = "http://localhost:6060/portal"


test('test web dev resource POST request', async () => {
    var testDoc =     {
        name: "web dev test",
        week: 1,
        tutorial_type: "tool",
        description: "week-1-test",
        time_taken_to_complete: "1 Day",
        url: "https://example.com/",
    }
    const response = await axios.post(`${API_URL}/web-dev-resources`, testDoc)
    expect(response.status).toEqual(201);
});

test('test web dev resource GET request', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/web-dev-resources/1`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].week).toEqual(1);
        })
});

test('test web dev resource DELETE request', async () => {
    var testDoc =     {
        name: "web dev test",
        week: 1,
    }
    const response = await axios.delete(`${API_URL}/web-dev-resources`, { data: testDoc })
    expect(response.status).toEqual(204);
});
