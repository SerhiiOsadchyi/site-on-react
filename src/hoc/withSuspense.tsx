import React, {Suspense} from "react";
import Preloader from "../components/common/Preloader/Preloader";

export function withSuspense<propsComponent> (Component: React.ComponentType<propsComponent>) {
    return (props: propsComponent) => {
        return <Suspense fallback={ <Preloader /> }>
            <Component {...props} />
        </Suspense>
    }
}