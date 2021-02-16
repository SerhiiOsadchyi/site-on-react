import loadingImage from "../../../assets/image/loading2.gif";
import React, {FC} from "react";

const Preloader: FC = () => {
    return (
        <div>
            <img src = {loadingImage} />
    </div>)
}

export default Preloader