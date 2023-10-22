import Joi from "joi";
import { ValidationError } from "./client-errors";

class GiftModel {

    public giftId: number;
    public audienceId: number;
    public name: string;
    public description: string;
    public price: number;
    public discount: number;

    public constructor(gift: GiftModel) {
        this.giftId = gift.giftId;
        this.audienceId = gift.audienceId;
        this.name = gift.name;
        this.description = gift.description;
        this.price = gift.price;
        this.discount = gift.discount;
    }

    private static validationSchema = Joi.object({
        giftId: Joi.number().optional().positive().integer(),
        audienceId: Joi.number().required().positive().integer(),
        name: Joi.string().required().max(50),
        description: Joi.string().required().min(10).max(1000),
        price: Joi.number().required().min(0).max(9999),
        discount: Joi.number().optional().min(0).max(100)
    });

    public validate(): void {
        const result = GiftModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default GiftModel;
