import React from 'react';
import styles from './Regions.scss';

const getNumSubRegions = (region) => {
  return region.children.length;
};

const getCountChildLibraries = (count, region) => count + region.libraries.length;

const getCountLibraries = (region) => {
  let libraries = region.libraries.length;
  if (region.children) {
    libraries += region.children.reduce(getCountChildLibraries, 0);
  }
  return libraries;
};

const renderDepth = (depth) => <div style={{display: 'inline-block', width: depth * 15}} />;

const renderLibraries = (libraries, depth) => (
  <div>
    {
      libraries.map(
        library => (
          <div className={`${styles.child} row`}>
            <div className="col-md-6">{renderDepth(depth)}{library.name}</div>
            <div className="col-md-2">Actions</div>
          </div>
        )
      )
    }
  </div>
);

const renderSubRegions = (parentRegion, regions, depth, expandToggleSubRegion) => (
  <div>
    {
      regions.map(
        region => (
          <div>
            <div className={`${styles.child} row`} onClick={() => expandToggleSubRegion(parentRegion, region)}>
              <div className="col-md-4">
                {renderDepth(depth)}<em className="fa fa-map-marker"/> {region.name} (<em className="fa fa-university"/> {getCountLibraries(region)})</div>
              <div className="col-md-4">{region.url}</div>
              <div className="col-md-2">Actions</div>
            </div>
            {renderLibraries(region.libraries, depth + 1)}
          </div>
        )
      )
    }
  </div>
);

/**
 * @param regions
 * @param expandToggleRegion
 * @param expandToggleSubRegion
 */
export const renderRegions = (regions, expandToggleRegion, expandToggleSubRegion) => (
  <div>
    {
      regions.map(
        /**
         * @param region.libraries
         */
        region => (
          <div className={`${styles.province}`}>
            <div className={`${styles.title} row`} onClick={() => expandToggleRegion(region)}>
              <div className="col-md-4">{region.name} ({getNumSubRegions(region)}) ({getCountLibraries(region)})</div>
              <div className="col-md-4">{region.url}</div>
              <div className="col-md-2">Actions</div>
              <div className="col-md-2">Actions</div>
            </div>
            {region.expanded && renderSubRegions(region, region.children, 1, expandToggleSubRegion)}
            {region.expanded && renderLibraries(region.libraries, 1)}
          </div>
        )
      )
    }
  </div>
);

