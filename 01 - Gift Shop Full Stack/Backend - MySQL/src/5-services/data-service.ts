import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import AudienceModel from "../3-models/audience-model";
import GiftModel from "../3-models/gift-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllAudience(): Promise<AudienceModel[]> {
    const sql = "SELECT * FROM audience";
    const audience = await dal.execute(sql);
    return audience;
}

async function getGiftsByAudience(audienceId: number): Promise<GiftModel[]> {
    const sql = "SELECT * FROM gifts WHERE audienceId = ?";
    const gifts = await dal.execute(sql, [audienceId]);
    return gifts;
}

async function addGift(gift: GiftModel): Promise<GiftModel> {
    gift.validate();
    const sql = "INSERT INTO gifts VALUES(DEFAULT, ?, ?, ?, ?, ?)";
    const info: OkPacket = await dal.execute(sql, [gift.audienceId, gift.name,
                                        gift.description, gift.price, gift.discount]);
    gift.giftId = info.insertId;
    return gift;
}

async function deleteGift(giftId: number): Promise<void> {
    const sql = "DELETE FROM gifts WHERE giftId = ?";
    const info: OkPacket = await dal.execute(sql, [giftId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(giftId);
}

export default {
    getAllAudience,
    getGiftsByAudience,
    addGift,
    deleteGift
};

