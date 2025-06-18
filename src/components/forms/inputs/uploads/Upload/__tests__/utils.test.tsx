import {
  calcFileProgress,
  createUploadFile,
} from '@/skin/forms/inputs/uploads/utils';

describe('Calculate Progress', () => {
  it('should equal to percentage if percentage', () => {
    const fakePercentage = 100;
    expect(
      calcFileProgress({ loaded: 25, total: 50, percentage: fakePercentage }),
    ).toStrictEqual(fakePercentage);
  });

  it('should calculate percentage through loaded and total', () => {
    expect(calcFileProgress({ loaded: 25, total: 50 })).toStrictEqual(50);
  });
});

describe('Create extended file', () => {
  it('should create an extended file', () => {
    const id = 'test';
    const file = createUploadFile(new File([''], 'filename'), { id });
    expect(file).toHaveProperty('id', id);
  });
});
