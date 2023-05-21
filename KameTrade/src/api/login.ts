//TODO: Pobrac dane do TradingView (bookmarks)

export const loginToTrading = async () => {
    const response = await fetch("https://your-rest-implementation.com/api/authorize", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};
