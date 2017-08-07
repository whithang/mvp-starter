import React from 'react';
import VolunteerSlotItem from './VolunteerSlotItem.jsx';

const VolunteerSlotList = (props) => (
  <div>
    <h4> Here are all the current locations looking for volunteers: </h4>
    There are { props.items.length } items.
    { props.items.map(item => <VolunteerSlotItem item={item}/>)}
  </div>
)

export default VolunteerSlotList;
