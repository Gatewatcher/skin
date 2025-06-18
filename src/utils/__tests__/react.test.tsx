import { isEmptyFragment, isFragment } from '../react';

describe('react utils', () => {
  describe('isFragment', () => {
    it('should be a fragment', () => {
      expect(isFragment(<></>)).toBeTruthy();
      expect(isFragment(<>fragment</>)).toBeTruthy();
    });

    it('should not be a fragment', () => {
      expect(isFragment(<span>span</span>)).toBeFalsy();
    });

    it('should be an empty fragment', () => {
      expect(isEmptyFragment(<></>)).toBeTruthy();
    });

    it('should not be an empty fragment', () => {
      expect(isEmptyFragment(<>not empty</>)).toBeFalsy();
      expect(isEmptyFragment(<span>not empty</span>)).toBeFalsy();
      expect(isEmptyFragment(<span></span>)).toBeFalsy();
      expect(
        isEmptyFragment(
          <>
            <div>1</div>
            <div>1</div>
          </>,
        ),
      ).toBeFalsy();
      expect(
        isEmptyFragment(
          <>
            <span />
          </>,
        ),
      ).toBeFalsy();
    });
  });
});
