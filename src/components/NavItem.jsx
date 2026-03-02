import { useContext } from "react";
import { PageContext } from "../utils/context.js";

const NavItem = ({ itemTitle }) => {

    const { changePage } = useContext(PageContext);

    return (
        <div
            onClick={() => changePage(itemTitle)}
            className="bg-danger rounded-md px-3 border cursor-pointer hover:bg-red-500 hover:text-white"
        >
            {itemTitle}
        </div>
    );
};

export default NavItem;