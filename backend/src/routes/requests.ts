import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Request as RequestEntity } from "../entities/Request";
import { Software } from "../entities/Software";
import { User } from "../entities/User";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["Employee"]), async (req: Request, res: Response): Promise<void> => {
  const { softwareId, accessType, reason } = req.body;
  if (!softwareId || !accessType || !reason) {
    res.status(400).json({ message: "Software ID, access type, and reason are required" });
    return;
  }

  const softwareRepo = AppDataSource.getRepository(Software);
  const software = await softwareRepo.findOne({ where: { id: softwareId } });
  if (!software) {
    res.status(404).json({ message: "Software not found" });
    return;
  }

  const requestRepo = AppDataSource.getRepository(RequestEntity);
  const request = requestRepo.create({
    user: { id: req.user!.id },
    software,
    accessType,
    reason,
    status: "Pending",
  });
  await requestRepo.save(request);
  res.json(request);
});

router.get("/pending", authMiddleware(["Manager"]), async (req: Request, res: Response): Promise<void> => {
  const requestRepo = AppDataSource.getRepository(RequestEntity);
  const requests = await requestRepo.find({ where: { status: "Pending" }, relations: ["user", "software"] });
  res.json(requests);
});

router.patch("/:id", authMiddleware(["Manager"]), async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["Approved", "Rejected"].includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  const requestRepo = AppDataSource.getRepository(RequestEntity);
  const request = await requestRepo.findOne({ where: { id: parseInt(id) } });
  if (!request) {
    res.status(404).json({ message: "Request not found" });
    return;
  }

  request.status = status;
  await requestRepo.save(request);
  res.json(request);
});

export default router;  