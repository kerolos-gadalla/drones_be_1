import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../app";
import MedicationModel from "./model.js";
import mongoose from "../config/db.js";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

jest.mock("../config/db.js", async () => {
  return { default: mongoose };
});

/**
 * Connect to the in-memory database.
 */
beforeAll(async () => {
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/**
 * Disconnect from the in-memory database.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Medication API", () => {
  // Define a test medication
  const testMedication = {
    name: "Test-Medication",
    code: "TEST123",
    image: "BAS64Encoded",
    weight: 100,
  };

  // Define a beforeAll hook to connect to the database and create the test medication
  beforeAll(async () => {
    await MedicationModel.deleteMany({});
    await MedicationModel.create(testMedication);
  });

  // Define a test for registering new medication
  describe("POST /medications", () => {
    it("responds with 201 and the new medication when valid data is provided", async () => {
      const res = await request(app)
        .post("/medications")
        .send({
          name: "New-Medication",
          code: "NEWMED123",
          image: "BAS64Encoded",
          weight: 100,
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe("New-Medication");
      expect(res.body.code).toBe("NEWMED123");

      // Delete the test medication from the database
      await MedicationModel.deleteOne({ _id: res.body._id });
    });

    it("responds with 400 and an error message when invalid data is provided", async () => {
      const res = await request(app)
        .post("/medications")
        .send({
          name: "New Medication",
        })
        .expect(400);
      expect(res.body).toHaveProperty(["name"]);
    });
    // done();
  });

  // Define a test for getting all medications
  describe("GET /medications", () => {
    it("responds with an array of medications", async () => {
      const res = await request(app).get("/medications").expect(200);

      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0].name).toBe("Test-Medication");
      expect(res.body[0].code).toBe("TEST123");
    });
  });

  // Define a test for getting a medication by code
  describe("GET /medications/:code", () => {
    it("responds with the medication with the given code", async () => {
      const res = await request(app).get("/medications/TEST123").expect(200);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe("Test-Medication");
      expect(res.body.code).toBe("TEST123");
    });

    it("responds with 404 and an error message when no medication with the given code is found", async () => {
      const res = await request(app)
        .get("/medications/INVALIDCODE")
        .expect(404);

      expect(res.body).toHaveProperty("error");
    });
  });
});
