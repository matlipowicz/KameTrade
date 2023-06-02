import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { theme } from "./theme/theme.ts";
import "@fontsource/saira/200.css";
import "@fontsource/saira/700.css";
import Navigation from "./Components/Nav/Nav.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import { About, Browse, LivePrice, Profile, SymulateInvest } from "./pages/index";
import AssetDetails from "./Components/Assets/AssetDetails.tsx";

// TODO: Lazy loading

function App() {
    return (
        <>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/browse">
                            <Route index element={<Browse />} />
                            <Route path=":id" element={<AssetDetails />} />
                        </Route>

                        <Route path="/live_price" element={<LivePrice />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/symulate_investment" element={<SymulateInvest />} />
                    </Routes>
                    <Footer />
                </ChakraProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
