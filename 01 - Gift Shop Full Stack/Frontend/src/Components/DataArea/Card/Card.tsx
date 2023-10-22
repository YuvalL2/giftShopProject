import GiftModel from "../../../Models/GiftModel";
import "./Card.css";

interface CardProps {
	gift: GiftModel;
    deleteMe: (giftId: number) => void;
}

function Card(props: CardProps): JSX.Element {

    function deleteMe() {
        props.deleteMe(props.gift.giftId);
    }

    return (
        <div className="Card">
            <button onClick={deleteMe}>❌</button>
            <br />
			<span>שם: {props.gift.name}</span>
            <br />
			<span>תיאור: {props.gift.description}</span>
            <br />
			<span>מחיר: {props.gift.price}</span>
            <br />
			<span>הנחה: {props.gift.discount}</span>
        </div>
    );
}

export default Card;
