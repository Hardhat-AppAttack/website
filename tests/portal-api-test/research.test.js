const axios = require('axios');
const request = require('supertest');

API_URL = "http://localhost:6060/portal"

test('file upload to research resources for week 1', async () => {
    var testDoc =     {
        name: "file-upload-test",
        week: 1,
        description: "file-upload-test",
        time_taken_to_complete: "1",
    }

    const response = await request(API_URL).post('/research-resources/upload').field(testDoc).attach('document', './test-resources/test-1.pdf');

    expect(response.status).toEqual(201);
});

test('file upload to research resources for week 2', async () => {
    var testDoc =     {
        name: "file-upload-test",
        week: 2,
        description: "file-upload-test",
        time_taken_to_complete: "1",
    }

    const response = await request(API_URL).post('/research-resources/upload').field(testDoc).attach('document', './test-resources/test-2.pdf');

    expect(response.status).toEqual(201);
});

test('file upload to research resources for week 3', async () => {
    var testDoc =     {
        name: "file-upload-test",
        week: 3,
        description: "file-upload-test",
        time_taken_to_complete: "1",
    }

    const response = await request(API_URL).post('/research-resources/upload').field(testDoc).attach('document', './test-resources/test-3.pdf');

    expect(response.status).toEqual(201);
});

test('test research resource GET request for week 1', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/research-resources/get-info/1`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].url).toEqual('test-1.pdf');
        })
});

test('test research resource GET requestf for week 2', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/research-resources/get-info/2`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].url).toEqual('test-2.pdf');
        })
});

test('test research resource GET request for week 3', async () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/research-resources/get-info/3`)
        .then(resp => resp.data)
        .then(resp => {
            expect(resp[0].url).toEqual('test-3.pdf');
        })
});

test('test research resource DELETE request for week 1', async () => {

    const response = await axios.delete(`${API_URL}/research-resources/delete/test-1.pdf`)
    expect(response.status).toEqual(200);
});

test('test research resource DELETE request for week 2', async () => {

    const response = await axios.delete(`${API_URL}/research-resources/delete/test-2.pdf`)
    expect(response.status).toEqual(200);
});

test('test research resource DELETE request for week 3', async () => {

    const response = await axios.delete(`${API_URL}/research-resources/delete/test-3.pdf`)
    expect(response.status).toEqual(200);
});