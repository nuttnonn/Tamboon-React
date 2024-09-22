import { Charity, CharityDonations, Payment } from '../types';

export const summaryDonations = (donations: number[]) => (
    donations.reduce((accumulator, value) => accumulator + value)
);

export const hundredsDivider = (donation: number) => (
    donation.toLocaleString()
);

export const summaryDonationsByCharity = (charities: Charity[], payments: Payment[]) => {
    const charityDonations: CharityDonations = {};

    charities.forEach(charity => {
        charityDonations[charity.id] = {
            name: charity.name,
            donations: [],
            total: 0,
        };
    });

    payments.forEach(payment => {
        if (charityDonations[payment.charitiesId]) {
            charityDonations[payment.charitiesId].donations.push(payment);
            charityDonations[payment.charitiesId].total += payment.amount;
        }
    })

    return charityDonations;
}