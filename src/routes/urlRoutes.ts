import express from "express";
import { redirectUrl, shortenUrl } from "../controllers/urlController";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);

export default router;
