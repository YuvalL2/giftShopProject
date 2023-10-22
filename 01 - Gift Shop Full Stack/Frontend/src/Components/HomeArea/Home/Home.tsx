import "./Home.css";
import imageSource from "../../../Assets/Images/home.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">

			<p>חנות המתנות המגניבה בארץ...</p>

            <img src={imageSource} />
            
        </div>
    );
}

export default Home;
