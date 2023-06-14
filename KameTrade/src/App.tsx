import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { theme } from "./theme/theme.ts";
import "@fontsource/saira/200.css";
import "@fontsource/saira/700.css";
import Navigation from "./Components/Nav/Nav.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import { About, Browse, LivePrice, Profile, SymulateInvest } from "./pages/index";
import { CoinDetails } from "./Components/AssetDetails/CoinDetails.tsx";
import { StockDetails } from "./Components/AssetDetails/StockDetail";
import GridLayout from "./layouts/Grid.tsx";
import { GridItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

// TODO: Lazy loading

function App() {
    return (
        <>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <GridLayout>
                        <GridItem colSpan={2} position="sticky" top="0" zIndex={1000}>
                            <Navigation />
                        </GridItem>

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <GridItem colSpan={2} alignSelf="start">
                                        <About />
                                    </GridItem>
                                }
                            />
                            <Route path="/browse">
                                <Route
                                    index
                                    element={
                                        <GridItem colSpan={2} rowSpan={2}>
                                            <Browse />
                                        </GridItem>
                                    }
                                />
                                <Route path="crypto">
                                    <Route path=":id/:uuid" element={<CoinDetails />} />
                                </Route>
                                <Route path="stock">
                                    <Route path=":id" element={<StockDetails />} />
                                </Route>
                            </Route>

                            <Route path="/live_price" element={<LivePrice />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/symulate_investment" element={<SymulateInvest />} />
                        </Routes>

                        <GridItem colSpan={2}>
                            <Footer />
                        </GridItem>
                    </GridLayout>
                </ChakraProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
