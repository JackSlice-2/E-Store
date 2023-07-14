"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
  });

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    // USE TO AVOID HYDRTION ERRORS // FIX BUG //
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    );
}

export default Currency;