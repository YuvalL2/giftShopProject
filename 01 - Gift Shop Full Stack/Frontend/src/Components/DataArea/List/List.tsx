import { ChangeEvent, useEffect, useState } from "react";
import AudienceModel from "../../../Models/AudienceModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";
import GiftModel from "../../../Models/GiftModel";
import Card from "../Card/Card";

function List(): JSX.Element {

    const [audience, setAudience] = useState<AudienceModel[]>([]);
    const [gifts, setGifts] = useState<GiftModel[]>([]);

    useEffect(() => {
        dataService.getAllAudience()
            .then(dbAudience => setAudience(dbAudience))
            .catch(err => notifyService.error(err));
    }, []);

    async function showGifts(args: ChangeEvent<HTMLSelectElement>) {
        try {
            const audienceId = +args.target.value;
            const dbGifts = await dataService.getGiftsByAudience(audienceId);
            setGifts(dbGifts);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    async function deleteGift(giftId: number) {
        try {
            const sure = window.confirm("האם אתה בטוח?");
            if(!sure) return;
            await dataService.deleteGift(giftId);
            setGifts(gifts.filter(g => g.giftId !== giftId)); // Update state list.
            notifyService.success("המתנה נמחקה בהצלחה");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="List">

            <label>בחר קהל יעד:</label>
            <select defaultValue="" onChange={showGifts}>
                <option disabled value="">בחר...</option>
                {audience.map(a => <option key={a.audienceId} value={a.audienceId}>{a.audienceName}</option>)}
            </select>
            <br /><br />

            {gifts.map(g => <Card key={g.giftId} gift={g} deleteMe={deleteGift} />)}

        </div>
    );
}

export default List;
