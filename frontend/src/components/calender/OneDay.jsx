import React, {useEffect, useState} from "react";
import {Button, Grid, Typography} from "@mui/material";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useDispatch} from "react-redux";
import {addNewDay} from "../../redux/slices/overtime/notSavedOvertimeSlice";
import {convertOvertimeToShownString} from "../utils/createStringOvertime";
import PropTypes from "prop-types";

const OneDay = (props) => {
    const [finishOvertime, setFinishOvertime] = useState('');
    const [sickness, setSickness] = useState(false);
    const [holiday, setHoliday] = useState(false);
    const [somethingChanged, setSomethingChanged] = useState(false);
    const {day, month, year, dayOfTheWeek, currentState} = props;
    const [time, setTime] = useState({});
    const [offDay, setOffDay] = useState(true);
    const [currentTime, setCurrentTime] = useState({
        start_time: '',
        end_time: ''
    });

    useEffect(() => {
        if(currentState.overtime){
            setFinishOvertime(
                convertOvertimeToShownString(currentState.overtime)
            );
        }else{
            setFinishOvertime('');
        }

        if(
            currentTime.start_time !== currentState.start_time ||
            currentTime.end_time !== currentState.end_time
        ){
            // The following conditions are made to avoid changing the value from an empty string to null.
            setCurrentTime(
            {
                start_time: currentState.start_time ? currentState.start_time : '',
                end_time: currentState.end_time ? currentState.end_time : '',
            }
        );}
        if(sickness !== currentState.sickness){
            setSickness(currentState.sickness);
        }
        if (holiday !== currentState.holiday){
            setHoliday(currentState.holiday);
        }

    },[currentState]);

    useEffect(() => {
        checkOffDay();
    },[month, sickness, holiday]);

    const dispatch = useDispatch();

    useEffect(() => {
        if(
            somethingChanged &&
            (time.start_time ||
            time.end_time ||
            checkPreviousFulfilled() ||
            currentState.sickness !== sickness ||
            currentState.holiday !== holiday)
        ){
            addNotSavedDay();
        }
    },[time, sickness, holiday]);

    const addNotSavedDay = () => {
        const overtime = count(time.start_time, time.end_time);
        dispatch(addNewDay(
            {
                start_time: time.start_time,
                end_time: time.end_time,
                overtime: overtime,
                holiday: holiday,
                sickness: sickness,
                date: setCurrentDate()
            }
        ));
    };

    const changeCurrentState = (event) => {
        const eventTime = event.target.value;

        if(event.target.name.includes('start')){
            setCurrentTime((prevState) => ({
                ...prevState,
                start_time: eventTime
            }));
        }else{
            setCurrentTime((prevState) => ({
                ...prevState,
                end_time: eventTime
            }));
        }

    };

    const checkOffDay = () => {
        if(
            (isWeekend() && !currentState.overtime) ||
            sickness ||
            holiday
        ){
            setOffDay(true);
        }else{
            setOffDay(false);
        }
    };

    const checkPreviousFulfilled = () => {
        return !!currentState.start_time || !!currentState.end_time ||
            currentState.sickness || currentState.holiday;
    };

    const convertMillisecondsToMinutes = (milliseconds) => {
        return Math.floor(milliseconds/60000);
    };

    const convertStringToTime = (string) => {
        try{
            const [hours, minutes] = string.split(":");
            return setTimeObject(hours, minutes);

        }catch (error){
            console.error("An error occurred: ", string);
            return null;
        }
    };

    const count = (startTimeString, endTimeString) => {
        if(startTimeString && endTimeString) {
            const startTime = convertStringToTime(startTimeString);
            const endTime = convertStringToTime(endTimeString);
            const differenceInMinutes = convertMillisecondsToMinutes(endTime - startTime);
            let timeWithoutPause = subtract_pause(differenceInMinutes);
            if(isWeekend()){
                setFinishOvertime(convertOvertimeToShownString(timeWithoutPause));
            }else{
                timeWithoutPause = subtractEightHours(timeWithoutPause);
                setFinishOvertime(convertOvertimeToShownString(timeWithoutPause));
            }
            return timeWithoutPause;
        }else{
            return null;
        }
    };


    const handleInput = (event) => {
        setSomethingChanged(true);
        const eventTime = event.target.value;
        if(checkPreviousFulfilled()){
            setTime({
                start_time: currentTime.start_time,
                end_time: currentTime.end_time
            });
        } else if(event.target.name.includes('start')){
            setTime({
                start_time: eventTime
            });
        } else{
            setTime((prevState) => ({
                ...prevState,
                    end_time: eventTime
                    }));
        }
    };

    const isWeekend = () => {
        let checkWeekend = new Date(year, month, day).getDay();
        return checkWeekend === 0 || checkWeekend === 6;
    };

    const setTimeObject = (hours, minutes) => {
        return new Date(`July 1, 1999, ${hours}:${minutes}:00`);
    };

    const setCurrentDate = () => {
        return `${year}-${month+1}-${day}`;
    };


    const subtractEightHours = (workingTimeInMinutes) => {
        const eightHours = 480;
        return workingTimeInMinutes - eightHours;
    };

    const subtract_pause = (differenceInMinutes) => {
        const twelveHours = {"minutes": 720, "pause": 15};
        const nineHours = {"minutes": 540, "pause": 15};
        const sixHours = {"minutes": 360, "pause" : 30};

        if(differenceInMinutes >= sixHours.minutes){
            differenceInMinutes = differenceInMinutes - sixHours.pause;
        }
        if(differenceInMinutes >= nineHours.minutes){
            differenceInMinutes = differenceInMinutes - nineHours.pause;
        }
        if(differenceInMinutes >= twelveHours.minutes){
            differenceInMinutes = differenceInMinutes - twelveHours.pause;
        }
        return differenceInMinutes;
    };

      const showDay = () => {

          setOffDay((prevState) => !prevState);
          if(holiday){
              setHoliday(false);
          }
          if(sickness){
              setSickness(false);
          }
          setSomethingChanged(true);
      };

    return(
        <Grid item xs={2}>
            <Grid direction="column" container>
                <Grid item xs={2}>
                    <Typography>
                        {day}.{month+1}.{year} {dayOfTheWeek}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    {!offDay && (
                    <Form onSubmit={count}>
                        <label>
                            Start
                            <Input
                                type="time"
                                name={`start_day${day}`}
                                onBlur={handleInput}
                                onChange={changeCurrentState}
                                value={currentTime.start_time}
                            />
                        </label>

                        <label>
                            End
                            <Input
                                type="time"
                                name={`end_day${day}`}
                                onBlur={handleInput}
                                onChange={changeCurrentState}
                                value={currentTime.end_time}
                            />
                        </label>
                    </Form>
                    )}
                    {offDay && (
                        <Button
                            size="small"
                            onClick={showDay}
                            variant="contained"
                        >
                          Type {dayOfTheWeek}
                        </Button>
                      )}
                </Grid>
                {!offDay && (
                    <Grid item xs={2} container>
                        <Grid item color={"purple"}>
                        {finishOvertime}
                        </Grid>

                        <Grid item>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setSickness(prev => !prev);
                                    setSomethingChanged(true);
                                }}
                            >
                                Sickness
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setHoliday(prev => !prev);
                                    setSomethingChanged(true);
                                }}
                            >
                                Holiday
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Grid>
                {sickness && (
                    <Typography>
                        You were sickness
                    </Typography>
                )}
                {holiday && (
                    <Typography>
                        You had a holiday
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

OneDay.propTypes = {
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    dayOfTheWeek: PropTypes.string,
    currentState: PropTypes.object
};

export default OneDay;
