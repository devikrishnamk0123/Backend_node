
import { when } from "jest-when";
import MathUtil from "../utils/math.util";


describe('Test average function',()=>{


    test('Test Average success case',()=>{
        MathUtil.sum = jest.fn().mockReturnValueOnce(8); //mock function sum.
        expect(MathUtil.average(4,4)).toBe(4);
    });

    test('Test Average 4+4',()=>{
        const mockedFunction = jest.fn();
        MathUtil.sum = mockedFunction;
        when(mockedFunction).calledWith(4,4).mockReturnValueOnce(8);
        expect(MathUtil.average(4,4)).toBe(4);
    })

    test('Test Average failure case',()=>{
        expect(MathUtil.average(4,4)).not.toBe(4);
    });
})

// test('two plus two', () => {
//     const value = 2 + 2;
//     expect(value).toBeGreaterThan(3);
//     expect(value).toBeGreaterThanOrEqual(3.5);
//     expect(value).toBeLessThan(5);
//     expect(value).toBeLessThanOrEqual(4.5);
  
//     // toBe and toEqual are equivalent for numbers
//     expect(value).toBe(4);
//     expect(value).toEqual(4);
// });


