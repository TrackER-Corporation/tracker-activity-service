import { beforeAll, describe, expect, it, vi } from "vitest";
import { createActivity, getActivityById } from "../db/controller/controller";
import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../db/services/database.service";


interface Response {
    status: number | any
    json: any
}

describe('Activity controller', async () => {
    beforeAll(async () => {
        await connectToDatabase()
        vi.clearAllMocks();
    });

    const mockResponse = () => {
        const res: Response = {
            json: {},
            status: {}
        };
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        return res;
    };

    it('should return ok for existing activity', async () => {
        const req = {
            params: {
                id: "62d1472a348c75187e07439c"
            }
        };
        const res = mockResponse();
        await getActivityById(req, res, {});
        expect(res).not.toBe(null);
    });

    it('should return error for no userId', async () => {
        const req = {
            body: {
                userId: "",
            }
        };
        const res = mockResponse();
        expect(async () => await createActivity(req, res, {})).rejects.toThrow(/Error/);

    });

    it('should ok creating activity', async () => {
        const req = {
            body: {
                userId: "111111111111",
            }
        };
        const res = mockResponse();
        await createActivity(req, res, {});
        expect(res).not.toBe(null);
    });

    it('should ok updating activity', async () => {
        const req = {
            body: {
                userId: "111111111111",
            }
        };
        const res = mockResponse();
        await createActivity(req, res, {});
        expect(res.status).toHaveBeenCalledWith(200);
        await collections.activity?.deleteOne({ userId: new ObjectId("111111111111") });
    });

});