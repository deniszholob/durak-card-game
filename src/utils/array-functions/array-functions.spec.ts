import {
  ArrayComparator,
  arrayDifference,
  arrayDifferenceSymmetrical,
  arrayIntersection,
  arrayUnion,
} from './array-functions';

describe('Array Functions', () => {
  interface I {
    id: string;
    label: string;
  }

  const comparatorN: ArrayComparator<number> = (a, b) => a === b;
  const comparatorI: ArrayComparator<I> = (a, b) =>
    a.id === b.id && a.label === b.label;

  it('arrayIntersection', () => {
    const arA: number[] = [1, 3, 4, 5];
    const arB: number[] = [1, 2, 5];

    expect(arrayIntersection(arA, arB, comparatorN)).toStrictEqual([1, 5]);
    expect(arrayIntersection(arB, arA, comparatorN)).toStrictEqual([1, 5]);
    expect(arrayIntersection([], arB, comparatorN)).toStrictEqual([]);
    expect(arrayIntersection(arA, [], comparatorN)).toStrictEqual([]);
    expect(arrayIntersection(arA, arA, comparatorN)).toStrictEqual(arA);
  });

  it('arrayDifference with numbers', () => {
    const arA: number[] = [1, 3, 4, 5];
    const arB: number[] = [1, 2, 5];
    const arAB: number[] = [3, 4];
    const arBA: number[] = [2];

    expect(arrayDifference(arA, arB, comparatorN)).toStrictEqual(arAB);
    expect(arrayDifference(arB, arA, comparatorN)).toStrictEqual(arBA);
    expect(arrayDifference([], arB, comparatorN)).toStrictEqual([]);
    expect(arrayDifference(arA, [], comparatorN)).toStrictEqual(arA);
    expect(arrayDifference(arA, arA, comparatorN)).toStrictEqual([]);
  });

  it('arrayDifference with objects', () => {
    const arA: I[] = [
      { id: '1', label: 'Monkey' },
      { id: '2', label: 'Bananas' },
      { id: '3', label: 'Vine' },
    ];
    const arB: I[] = [
      { id: '1', label: 'Monkey' },
      { id: '1', label: 'Water' },
    ];
    const arAB: I[] = [
      { id: '2', label: 'Bananas' },
      { id: '3', label: 'Vine' },
    ];
    const arBA: I[] = [{ id: '1', label: 'Water' }];

    expect(arrayDifference(arA, arB, comparatorI)).toStrictEqual(arAB);
    expect(arrayDifference(arB, arA, comparatorI)).toStrictEqual(arBA);
    expect(arrayDifference([], arB, comparatorI)).toStrictEqual([]);
    expect(arrayDifference(arA, [], comparatorI)).toStrictEqual(arA);
    expect(arrayDifference(arA, arA, comparatorI)).toStrictEqual([]);
  });

  it('arrayDifference symmetrical', () => {
    const arA: number[] = [1, 3, 4, 5];
    const arB: number[] = [1, 2, 5];
    const arC: number[] = [2, 3, 4];

    expect(
      arrayDifferenceSymmetrical(arA, arB, comparatorN).sort()
    ).toStrictEqual(arC);
    expect(
      arrayDifferenceSymmetrical(arB, arA, comparatorN).sort()
    ).toStrictEqual(arC);
    expect(arrayDifferenceSymmetrical([], arB, comparatorN)).toStrictEqual(arB);
    expect(arrayDifferenceSymmetrical(arA, [], comparatorN)).toStrictEqual(arA);
    expect(arrayDifferenceSymmetrical(arA, arA, comparatorN)).toStrictEqual([]);
  });

  it('arrayUnion', () => {
    const arA: number[] = [1, 3, 4, 5];
    const arB: number[] = [1, 2, 5];
    const arC: number[] = [1, 2, 3, 4, 5];

    expect(arrayUnion(arA, arB).sort()).toStrictEqual(arC);
    expect(arrayUnion(arB, arA).sort()).toStrictEqual(arC);
    expect(arrayUnion([], arB)).toStrictEqual(arB);
    expect(arrayUnion(arA, [])).toStrictEqual(arA);
    expect(arrayUnion(arA, arA)).toStrictEqual(arA);
  });
});
