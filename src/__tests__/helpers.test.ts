import { hundredsDivider, summaryDonations, summaryDonationsByCharity } from '../utils/helpers';
import { Charity, Payment } from '../types';

describe('helpers', () => {
    describe('summaryDonations', () => {
        test('should calculate the sum of donations correctly', () => {
            expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
        });

        test('should return 0 for an empty array', () => {
            expect(summaryDonations([])).toEqual(0);
        });

        test('should handle negative numbers correctly', () => {
            expect(summaryDonations([-1, -2, -3, -4])).toEqual(-10);
        });

        test('should handle mixed positive and negative numbers', () => {
            expect(summaryDonations([1, -2, 3, -4])).toEqual(-2);
        });

        test('should handle single value correctly', () => {
            expect(summaryDonations([5])).toEqual(5);
        });
    });

    describe('hundredsDivider', () => {
        test('should format number correctly as a string', () => {
            expect(hundredsDivider(1000)).toEqual('1,000');
        });

        test('should handle zero correctly', () => {
            expect(hundredsDivider(0)).toEqual('0');
        });

        test('should handle negative numbers', () => {
            expect(hundredsDivider(-1000)).toEqual('-1,000');
        });

        test('should return string representation of non-integer numbers', () => {
            expect(hundredsDivider(1234567.89)).toEqual('1,234,567.89');
        });
    });

    describe('summaryDonationsByCharity', () => {
        const charities: Charity[] = [
            { id: 1, name: 'Charity One', image: 'charity1 image', currency: 'charity1 currency' },
            { id: 2, name: 'Charity Two', image: 'charity2 image', currency: 'charity2 currency' },
        ];

        const payments: Payment[] = [
            { charitiesId: 1, amount: 100, currency: 'charity1 currency', id: 1 },
            { charitiesId: 1, amount: 200, currency: 'charity1 currency', id: 2 },
            { charitiesId: 2, amount: 300, currency: 'charity2 currency', id: 3 },
        ];

        test('should summarize donations by charity correctly', () => {
            const result = summaryDonationsByCharity(charities, payments);
            expect(result).toEqual({
                1: {
                    name: 'Charity One',
                    donations: [
                        { charitiesId: 1, amount: 100, currency: 'charity1 currency', id: 1 },
                        { charitiesId: 1, amount: 200, currency: 'charity1 currency', id: 2 },
                    ],
                    currency: 'charity1 currency',
                    total: 300,
                },
                2: {
                    name: 'Charity Two',
                    donations: [
                        { charitiesId: 2, amount: 300, currency: 'charity2 currency', id: 3 },
                    ],
                    currency: 'charity2 currency',
                    total: 300,
                },
            });
        });

        test('should return an empty donations for no payments', () => {
            const result = summaryDonationsByCharity(charities, []);
            expect(result).toEqual({
                1: {
                    name: 'Charity One',
                    donations: [],
                    currency: 'charity1 currency',
                    total: 0,
                },
                2: {
                    name: 'Charity Two',
                    donations: [],
                    currency: 'charity2 currency',
                    total: 0,
                },
            });
        });

        test('should handle charities with no payments correctly', () => {
            const newCharities: Charity[] = [
                { id: 3, name: 'Charity Three', image: 'charity3 image', currency: 'charity3 currency' },
            ];
            const result = summaryDonationsByCharity(newCharities, payments);
            expect(result).toEqual({
                3: {
                    name: 'Charity Three',
                    donations: [],
                    currency: 'charity3 currency',
                    total: 0,
                },
            });
        });
    });
});