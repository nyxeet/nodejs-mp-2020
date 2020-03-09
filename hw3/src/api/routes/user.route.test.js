import * as request from 'supertest';
import server from '../../server';

describe('user.route', () => {
    it('should fetch auto suggestions of users', async () => {
        const loginSubstring = 'Iva';
        const limit = 10;
        const res = await request(server)
            .get(`/users/autoSuggest?loginSubstring=${loginSubstring}&limit=${limit}`);

        expect(res.status)
    })
})