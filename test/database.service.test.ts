import { describe, expect, it } from "vitest";
import * as mongoDB from 'mongodb';
import { collections, connectToDatabase } from "../db/services/database.service";


describe('connectToDatabase', () => {
    it('should connect to the database and set up the activity collection', async () => {

        // Connect to the database
        await connectToDatabase();

        // Check that the activity collection has been set up
        expect(collections.activity).toBeInstanceOf(mongoDB.Collection);

        // Check that the connection was successful by inserting a new activity
        const activity = {
            _id: new mongoDB.ObjectId("62c1b7f70aa8cf549cc62069"),
            userId: new mongoDB.ObjectId("62bee981e63f093c813b8a09"),
            country_code: "IT",
            country_name: "Italy",
            city: "Ravenna",
            state: "Provincia di Ravenna",
            date: "2023-03-15T08:45:48.695+00:00",
            __v: 0
        };

        const result = await collections.activity?.insertOne(activity);
        expect(result?.acknowledged).toBe(true);

        // Clean up by deleting the test activity
        await collections.activity?.deleteOne({ _id: result?.insertedId });
    });
});