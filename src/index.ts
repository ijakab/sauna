import {Collector} from './collector/Collector';
import {StringMultiLineLoader} from './loaders/StringMultiLineLoader';

export * from './collector/Collector'
export * from './map/Point'
export * from './map/PointMap'
export * from './loaders/ILoader'
export * from './loaders/StringArrayLoader'
export * from './loaders/StringMultiLineLoader'

export function resolveCollectorFromMap(input: string) {
    const loader = new StringMultiLineLoader(input)
    const map = loader.loadMap()

    return new Collector(map)
}
