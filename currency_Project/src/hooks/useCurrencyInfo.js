const { useState, useEffect } = require("react");



function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((Response) => Response.json())
            .then(() => setData(Response[currency]))
            .console.log(data);
    }, [currency])
    console.log(data);
    return data;
}

export default useCurrencyInfo;