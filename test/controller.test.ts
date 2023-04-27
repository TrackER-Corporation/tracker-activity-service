import { beforeAll, describe, expect, it, vi } from "vitest";
import { createActivity, getActivityById } from "../db/controller/controller";
import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "../db/services/database.service";


interface Response {
    status: number | any
    json: any
}

describe('Building controller', async () => {
    await connectToDatabase();
    const mockRequest = (id: ObjectId) => ({ params: { id } });
    const mockResponse = () => {
        const res: Response = {
            json: {},
            status: {}
        };
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        return res;
    };
    const mockCollections = {
        activity: {
            findOne: vi.fn(),
        },
    };

    beforeAll(() => {
        vi.clearAllMocks();
    });

    it('should return error for no activity id', async () => {
        const activity = { _id: new ObjectId("62bee981e63f093c813b8a02") };
        const req = mockRequest(activity._id);
        const res = mockResponse();
        mockCollections.activity.findOne.mockResolvedValueOnce(activity);
        await getActivityById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error for no activity id', async () => {
        const activity = { _id: new ObjectId("111111111111") };
        const req = mockRequest(activity._id);
        const res = mockResponse();
        mockCollections.activity.findOne.mockResolvedValueOnce(activity);
        await getActivityById(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return error for no userId', async () => {
        const req = {
            body: {
                userId: null,
            }
        };
        const res = mockResponse();
        await createActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should create a new building', async () => {
        const req = {
            body: {
                userId: new ObjectId("62bee981e63f093c813b8a09"),
            }
        };
        const res = mockResponse();
        await createActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        await collections.activity?.deleteOne({ userId: new ObjectId("62bee981e63f093c813b8a09") });
    });

});