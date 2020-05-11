import Rate from "../../models/Rate"

export const DUMMY_RATES = [
    new Rate(
        'RESIDENTIAL', 
        "'classification', 'metersize'", 
        `classification =='RESIDENTIAL' && metersize == 'ONE_HALF'`,
        `
        if (volume <= 10)
            return volume * 10;
        if (volume <= 20)
            return 100 + (volume - 10) * 20);
        return 200 + (volume - 15) * 25);
        `,
        1
    ),
    new Rate(
        'COMMERCIAL', 
        "'classification', 'metersize'", 
        `classification =='COMMERCIAL' && metersize == 'ONE'`,
        `
        if (volume <= 500)
            return volume * 10;
        if (volume <= 1000)
            return 5000 + (volume - 500) * 8);
        return 9000 + (volume - 1000) * 6);
        `,
        2
    ),
    new Rate(
        'COMPUTATION_FOR_INDUSTRIAL_BULK', 
        
        "'classification', 'metersize'", 
        `classification =='INDUSTRIAL' && metersize == 'TWO'`,
        `
        if (volume <= 1000)
            return volume * 6;
        if (volume <= 2000)
            return 6000 + (volume - 1000) * 4);
        return 10000 + (volume - 2000) * 2);
        `,
        3
    )
]
