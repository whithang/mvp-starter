import React from 'react';
import PlayListItem from './PlayListItem.jsx';

const PlayList = (props) => (
  <div>
    <h4> Here are all the current people looking for golf partners: </h4>
    There are { props.items.length } items.
    { props.items.map(item => <PlayListItem item={item}/>)}
  </div>
)

export default PlayList;
