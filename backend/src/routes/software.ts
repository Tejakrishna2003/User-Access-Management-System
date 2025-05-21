import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Software } from "../entities/Software";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["Admin"]), async (req: Request, res: Response): Promise<void> => {
  const { name, description, accessLevels } = req.body;
  if (!name || !description || !Array.isArray(accessLevels)) {
    res.status(400).json({ message: "Name, description, and accessLevels are required" });
    return;
  }

  const softwareRepo = AppDataSource.getRepository(Software);
  const software = softwareRepo.create({ name, description, accessLevels });
  await softwareRepo.save(software);
  res.json(software);
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const softwareRepo = AppDataSource.getRepository(Software);
  const softwares = await softwareRepo.find();
  res.json(softwares);
});

export default router;