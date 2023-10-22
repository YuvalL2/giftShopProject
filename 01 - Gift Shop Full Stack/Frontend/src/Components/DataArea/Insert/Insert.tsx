import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AudienceModel from "../../../Models/AudienceModel";
import GiftModel from "../../../Models/GiftModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {

    const [audience, setAudience] = useState<AudienceModel[]>([]);
    const { register, handleSubmit, formState } = useForm<GiftModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllAudience()
            .then(dbAudience => setAudience(dbAudience))
            .catch(err => notifyService.error(err));
    }, []);

    async function send(gift: GiftModel) {
        try {
            await dataService.addGift(gift);
            notifyService.success("המתנה התווספה בהצלחה.");
            navigate("/list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">

            <form onSubmit={handleSubmit(send)}>

                <label>בחר קהל יעד:</label>
                <select defaultValue="" {...register("audienceId", GiftModel.audienceIdValidation)}>
                    <option disabled value="">בחר...</option>
                    {audience.map(a => <option key={a.audienceId} value={a.audienceId}>{a.audienceName}</option>)}
                </select>
                <span className="Error">{formState.errors.audienceId?.message}</span>

                <label>שם מתנה:</label>
                <input type="text" {...register("name", GiftModel.nameValidation)} />
                <span className="Error">{formState.errors.name?.message}</span>

                <label>תיאור המתנה</label>
                <input type="text" {...register("description", GiftModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>

                <label>מחיר המתנה:</label>
                <input type="number" step="0.01" {...register("price", GiftModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>הנחה:</label>
                <input type="number" {...register("discount", GiftModel.discountValidation)} />
                <span className="Error">{formState.errors.discount?.message}</span>

                <button>הוסף</button>

            </form>


            {/* Form using HTML validation: */}
            {/* <form onSubmit={handleSubmit(send)}>

                <label>בחר קהל יעד:</label>
                <select defaultValue="" {...register("audienceId")} required>
                    <option disabled value="">בחר...</option>
                    {audience.map(a => <option key={a.audienceId} value={a.audienceId}>{a.audienceName}</option>)}
                </select>

                <label>שם מתנה:</label>
                <input type="text" {...register("name")} required maxLength={50} />

                <label>תיאור המתנה</label>
                <input type="text" {...register("description")} required minLength={10} maxLength={1000} />

                <label>מחיר המתנה:</label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="9999" />

                <label>הנחה:</label>
                <input type="number" {...register("discount")} required min="0" max="100" />

                <button>הוסף</button>

            </form> */}

        </div>
    );
}

export default Insert;
