import { useState, useEffect } from "react"
import { Link } from "react-router-dom" 
import './Css/Home.css'
import Filter from './Filter'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


function Events({selEvent, setSelEvent, eventData, setEventData}){
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const handleEvent = (e) => {
        if(selEvent.includes(e)) return
        setSelEvent([...selEvent, e])
        console.log('event added')
    }
// FILTERS - START 
    const handleFilterName = (name) => {
        const filteredData = eventData.filter((item) => {
            const fullName = `${item.title}`
            if (fullName.toLowerCase().includes(name.toLowerCase())) {
                return item;
            }
        });

        setEventData(filteredData);
    };
    const handleFilterDate = (date, field) => {
        const filteredData = eventData.filter((item) => {
            if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
                return item;
            }
        });

        setEventData(filteredData);
    };
// FILTERS - END 

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        <div className="event-cont" style={{padding: '5%', backgroundColor:'#1A1A1D', borderRadius: '2%', display: 'flex', flexDirection: 'column'}}>
            <Filter setSearchInput={setSearchInput} handleChange={handleChange} onNameFilter={handleFilterName} onDateFilter={handleFilterDate} refreshPage={refreshPage}/>
            <div className="event-wrap">
            {
                eventData.filter(event => event.title.includes(searchInput)).map((event, i)=> {
                    return(
                        <div className='card-cont' key={event.id}>
                            <Card style={{background:'none', borderRadius: '15px', color: 'black', width: '100%'}}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    {event.location}
                                    </Typography>
                                    <hr></hr>
                                    <Typography variant="h5" component="div">
                                    Event: {event.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }}>
                                    {event.about}
                                    </Typography>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                        <Button disabled style ={{background: 'rgb(205, 106, 101)', color: '#fff'}}variant="contained">{event.going} Attending</Button>
                                    </div>
                                    
                                </CardContent>
                                <CardActions >
                                    <Link to={'/selEvent'}>
                                    <Button style={{color: '#000', textDecoration: 'none'}}  size="large" onClick={()=> handleEvent(event)}>Learn More</Button></Link>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Events
