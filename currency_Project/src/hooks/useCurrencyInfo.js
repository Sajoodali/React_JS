import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
            .then((response) => response.json())
            .then((data) => setData(data[currency])) 
            .catch((error) => console.error("Error fetching currency data:", error));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
