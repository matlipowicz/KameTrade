import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { theme } from "./theme/theme.ts";
import "@fontsource/saira/200.css";
import "@fontsource/saira/700.css";
import Navigation from "./Components/Nav/Nav";
import { About, Browse, LivePrice, Profile, SymulateInvest } from "./Components/pages/index";
import SideNav from "src/Components/Nav/SideNav.tsx";
// TODO: Lazy loading

function App() {
    return (
        <>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    {/* <SideNav /> */}
                    <Navigation />

                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/live_price" element={<LivePrice />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/symulate_investment" element={<SymulateInvest />} />
                    </Routes>
                </ChakraProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
