import React from 'react';
import PropTypes from 'prop-types';


function renderComponents(name, regions) {
  if (regions[name] && regions[name].components) {
    return regions[name].components.map(c => `<!--# COMPONENT ${c.path} -->`).join('');
  }
  return '';
}

const Region = props => (
  <div data-portal-region={props.name} dangerouslySetInnerHTML={
    {
      __html: renderComponents(props.name, props.regions)
    }
  } />
);

Region.propTypes = {
  name: PropTypes.string,
  regions: PropTypes.node
};

export default Region;
