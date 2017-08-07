import React from 'react';
// import VolunteerSlotItem from './VolunteerSlotItem.jsx';

//add checkboxes next to each, select one and add your login info
const VolunteerSlotList = (props) => (
  <div>
    <h4> Here are all the current events looking for volunteers: </h4>
    There are { props.items.length } items.
    <div>
      <ul>
        { props.items.map(item =>
          <li key={item.slot_id}><b>Location:</b> <a href=''>{item.name}</a>
            <br></br>
            <b>Volunteer Event Date:</b> {item.volunteer_date.split('T').shift()}, {item.state}
            <br></br>
            <b>Start Time:</b> {item.start_time}
            <br></br>
            <b>End Time:</b> {item.end_time}
            <br></br>
            <b>Volunteers Needed:</b> {item.num_volunteers_needed}
            <br></br>
            <b>Volunteers Booked:</b> {item.num_volunteers_booked}
          </li>
        )}
      </ul>
    </div>
  </div>
)

export default VolunteerSlotList;
