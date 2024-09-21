export const summaryDonations = (donations: number[]) => (
    donations.reduce((accumulator, value) => accumulator + value)
);