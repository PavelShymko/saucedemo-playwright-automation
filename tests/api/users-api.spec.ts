import { test, expect } from '@playwright/test';

const API_URL = 'https://reqres.in/api';

test.describe('Users API', () => {

  test('GET users returns 200 and users list', async ({ request }) => {
    const response = await request.get(`${API_URL}/users?page=2`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET user returns correct user data', async ({ request }) => {
    const response = await request.get(`${API_URL}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
    expect(body.data.last_name).toBeDefined();
  });

  test('GET non-existing user returns 404', async ({ request }) => {
    const response = await request.get(`${API_URL}/users/9999`);

    expect(response.status()).toBe(404);
  });

});