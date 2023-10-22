import axios from "axios";
import AudienceModel from "../Models/AudienceModel";
import appConfig from "../Utils/AppConfig";
import GiftModel from "../Models/GiftModel";

class DataService {

    public async getAllAudience(): Promise<AudienceModel[]> {
        const response = await axios.get<AudienceModel[]>(appConfig.audienceUrl);
        const audience = response.data;
        return audience;
    }

    public async getGiftsByAudience(audienceId: number): Promise<GiftModel[]> {
        const response = await axios.get<GiftModel[]>(appConfig.giftsByAudienceUrl + audienceId);
        const gifts = response.data;
        return gifts;
    }

    public async addGift(gift: GiftModel): Promise<void> {
        await axios.post<GiftModel>(appConfig.giftsUrl, gift);
    }
    
    public async deleteGift(giftId: number): Promise<void> {
        await axios.delete(appConfig.giftsUrl + giftId);
    }
}

const dataService = new DataService();

export default dataService;
