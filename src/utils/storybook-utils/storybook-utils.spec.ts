import * as sb from './storybook-utils';

describe('Storybook Utils', () => {
  enum TestStringEnum {
    'banana' = 'Banana',
    'strawberry' = 'Strawberry',
  }

  enum TestNumberEnum {
    banana,
    strawberry,
  }

  it('enumToOptionsNonKeyed', () => {
    const expectedStr = {};
    const expectedNum = {
      banana: TestNumberEnum.banana,
      strawberry: TestNumberEnum.strawberry,
    };
    expect(sb.enumToOptionsNonKeyed(TestStringEnum)).toStrictEqual(expectedStr);
    expect(sb.enumToOptionsNonKeyed(TestNumberEnum)).toStrictEqual(expectedNum);
  });

  it('enumToOptionsKeyed', () => {
    const expectedStr = [TestStringEnum.banana, TestStringEnum.strawberry];
    const expectedNum = [
      'banana',
      'strawberry',
      TestNumberEnum.banana,
      TestNumberEnum.strawberry,
    ];
    expect(sb.enumToOptionsKeyed(TestStringEnum)).toStrictEqual(expectedStr);
    expect(sb.enumToOptionsKeyed(TestNumberEnum)).toStrictEqual(expectedNum);
  });
});
