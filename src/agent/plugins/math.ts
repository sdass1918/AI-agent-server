export function evaluateMath(expression: string): number | string {
    try {
        // Use the Function constructor to evaluate the expression safely
        const result = new Function(`'use strict'; return (${expression})`)();
        return result;
    } catch (error) {
        return 'Invalid mathematical expression';
    }
}