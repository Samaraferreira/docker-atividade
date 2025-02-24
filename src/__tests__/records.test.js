const request = require('supertest');
const express = require('express');
const router = require('../routes/records');
const db = require('../database');

const app = express();
app.use(express.json());
app.use('/records', router);

jest.mock('../database');

describe('Records API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /records - should return a list of records', async () => {
    const mockRecords = [
      { id: 1, name: 'Record 1', description: 'Description 1' },
      { id: 2, name: 'Record 2', description: 'Description 2' }
    ];

    db.query.mockResolvedValue({ rows: mockRecords });

    const response = await request(app).get('/records');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRecords);
  });

  test('GET /records - should handle database errors', async () => {
    db.query.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/records');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch records' });
  });

  test('POST /records - should create a new record', async () => {
    const newRecord = { name: 'New Record', description: 'New Description' };
    const mockInsertedRecord = { id: 1, ...newRecord };

    db.query.mockResolvedValue({ rows: [mockInsertedRecord] });

    const response = await request(app).post('/records').send(newRecord);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockInsertedRecord);
  });

  test('POST /records - should handle database errors', async () => {
    db.query.mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/records').send({ name: 'Test', description: 'Desc' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to add record' });
  });
});
