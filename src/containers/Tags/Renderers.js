import React from 'react'
const styles = require('./Regions.scss')

const renderSubRegions = (regions) => (
  <div>
    {
      regions.map(
        region => (
          <div className={`${styles.child} row`}>
            <div className="col-md-10">- {region.name}</div>
            <div className="col-md-2">Acties</div>
          </div>
        )
      )
    }
  </div>
)

export const renderRegions = (regions, expandToggleRegion) => (
  <div>
    {
      regions.map(
        region => (
          <div className={styles.province}>
            <div className={`${styles.provinceTitle} row`} onClick={() => expandToggleRegion(region)}>
              <div className="col-md-10">{region.name} ({region.children.length})</div>
              <div className="col-md-2">Acties</div>
            </div>
            {region.expanded && renderSubRegions(region.children)}
          </div>
        )
      )
    }
  </div>
)


