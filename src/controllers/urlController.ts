import type { Request, Response } from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import urlModel from "../models/url.model";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// Function to shorten the URL
export const shortenUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  // Validate base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ message: "Invalid base URL" });
  }

  const urlCode = shortid.generate();

  // Validate original URL
  if (validUrl.isUri(originalUrl)) {
    try {
      // Check if the original URL is already shortened
      let url = await urlModel.findOne({ originalUrl });

      if (url) {
        return res.status(200).json({ message: "URL already shortened", url });
      }

      // If not found, create a new shortened URL
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new urlModel({
        originalUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save();

      return res.status(201).json({
        message: "Shortened URL created successfully",
        url,
      });
    } catch (err: any) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid original URL" });
  }
};

// Function to handle URL red

export const redirectUrl = async (req: Request, res: Response) => {
  try {
    const url = await urlModel.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
        console.log()
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (err:any) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};
