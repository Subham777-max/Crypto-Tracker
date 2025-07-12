import { Route, Routes } from "react-router-dom";
import CustomLayout from "../Layout/CustomLayout";
import { lazy, Suspense } from "react";
import CustomErrorBoundary from "../Components/CustomErrorBoundary/CustomErrorBoundary";

const Home=lazy(()=>import('../Pages/Home'));
const CoinDetails=lazy(()=>import('../Pages/CoinDetails'));
const CoinTable=lazy(()=>import('../Pages/CoinTable'));

function Routing(){
    return(
        <>
            <CustomErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<CustomLayout />}>
                            <Route index element={<Home />} />
                            <Route path="/coinTable" element={<CoinTable />} />
                            <Route path="/coinDetails/:coinId" element={<CoinDetails />} />
                        </Route>
                    </Routes>
                </Suspense>
        </CustomErrorBoundary>

        </>
    );
}
export default Routing;