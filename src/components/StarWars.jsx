import { starWarsInfo } from "../utils/constants.js";

const StarWars = () => {
    return (
        <div className="text-3xl text-justify mt-6 px-6">
            {starWarsInfo}
        </div>
    );
};

export default StarWars;