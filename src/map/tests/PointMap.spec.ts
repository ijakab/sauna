import { PointMap } from '../PointMap';
import { Point } from '../Point';
import { InvalidCharacterError } from '../../errors/InvalidCharacterError';
import { UnexpectedError } from '../../errors/UnexpectedError';
import { NoStartingSymbolError } from '../../errors/NoStartingSymbolError';
import { MultipleStartingSymbolError } from '../../errors/MultipleStartingSymbolError';
import { MissingSymbolError } from '../../errors/MissingSymbolError';
import { START_SYMBOL } from '../../Config';

describe('PointMap', () => {
  it('should initialize grid with correct dimensions', () => {
    const pointMap = new PointMap(3, 4);

    expect(pointMap.getPoint(0, 0)).toBeInstanceOf(Point);
    expect(pointMap.getPoint(2, 3)).toBeInstanceOf(Point);
    expect(pointMap.getPoint(3, 0)).toBeUndefined();
    expect(pointMap.getPoint(0, 4)).toBeUndefined();
  });

  it('should return point for valid coordinates', () => {
    const pointMap = new PointMap(3, 3);

    const point = pointMap.getPointOrFail(2, 2);

    expect(point).toBeInstanceOf(Point);
    expect(point.row).toBe(2);
    expect(point.col).toBe(2);
  });

  it('should throw for invalid coordinates', () => {
    const pointMap = new PointMap(3, 3);

    expect(() => pointMap.getPointOrFail(3, 3)).toThrow(UnexpectedError);
  });

  it('should return undefined for empty point', () => {
    const pointMap = new PointMap(3, 3);

    expect(pointMap.getNonEmptyPoint(1, 1)).toBeUndefined();
  });

  it('should return point for non-empty point', () => {
    const pointMap = new PointMap(3, 3);
    pointMap.setPoint(1, 1, 'A');

    const point = pointMap.getNonEmptyPoint(1, 1);

    expect(point).toBeInstanceOf(Point);
  });

  it('should set valid character', () => {
    const pointMap = new PointMap(3, 3);

    pointMap.setPoint(1, 2, 'A');

    expect(pointMap.getPoint(1, 2).getValue()).toBe('A');
  });

  it('should throw for invalid character', () => {
    const pointMap = new PointMap(3, 3);

    expect(() => pointMap.setPoint(1, 2, '!')).toThrow(InvalidCharacterError);
    expect(() => pointMap.setPoint(1, 2, 'AB')).toThrow(InvalidCharacterError);
  });

  it('should return start point', () => {
    const pointMap = new PointMap(3, 3);
    pointMap.setPoint(1, 1, START_SYMBOL);

    const startPoint = pointMap.getStartingPoint();

    expect(startPoint.row).toBe(1);
    expect(startPoint.col).toBe(1);
    expect(startPoint.getValue()).toBe(START_SYMBOL);
  });

  it('should throw if no start point exists', () => {
    const pointMap = new PointMap(3, 3);

    expect(() => pointMap.getStartingPoint()).toThrow(NoStartingSymbolError);
  });

  it('should throw if multiple start points exist', () => {
    const pointMap = new PointMap(3, 3);
    pointMap.setPoint(0, 0, START_SYMBOL);
    pointMap.setPoint(2, 2, START_SYMBOL);

    expect(() => pointMap.getStartingPoint()).toThrow(MultipleStartingSymbolError);
  });

  it('should return point with matching symbol', () => {
    const pointMap = new PointMap(3, 3);
    pointMap.setPoint(1, 2, 'E');

    const point = pointMap.getPointWithSymbol('E');

    expect(point.row).toBe(1);
    expect(point.col).toBe(2);
    expect(point.getValue()).toBe('E')
  });

  it('should throw if symbol not found', () => {
    const pointMap = new PointMap(3, 3);

    expect(() => pointMap.getPointWithSymbol('Z')).toThrow(MissingSymbolError);
  });
});
