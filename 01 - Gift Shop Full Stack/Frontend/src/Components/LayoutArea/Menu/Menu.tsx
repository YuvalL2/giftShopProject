import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">בית</NavLink>
            <span> | </span>
			<NavLink to="/list">מתנות</NavLink>
            <span> | </span>
			<NavLink to="/insert">הוסף מתנה</NavLink>
        </div>
    );
}

export default Menu;
