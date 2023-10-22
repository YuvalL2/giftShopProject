import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import GiftModel from "../3-models/gift-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// GET http://localhost:4000/api/audience
router.get("/audience", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const audience = await dataService.getAllAudience();
        response.json(audience);
    }
    catch (err: any) { next(err); }
});

// GET http://localhost:4000/api/gifts-by-audience/:audienceId
router.get("/gifts-by-audience/:audienceId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const audienceId = +request.params.audienceId;
        const gifts = await dataService.getGiftsByAudience(audienceId);
        response.json(gifts);
    }
    catch (err: any) { next(err); }
});

// POST http://localhost:4000/api/gifts
router.post("/gifts", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const gift = new GiftModel(request.body);
        const addedGift = await dataService.addGift(gift);
        response.status(StatusCode.Created).json(addedGift);
    }
    catch (err: any) { next(err); }
});

// DELETE http://localhost:4000/api/gifts/:giftId
router.delete("/gifts/:giftId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const giftId = +request.params.giftId;
        await dataService.deleteGift(giftId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) { next(err); }
});

export default router;
