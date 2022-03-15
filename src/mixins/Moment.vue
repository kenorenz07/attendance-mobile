<script>
import moment from 'moment'
export default {
    data: () => ({

    }),
    methods : {
        time_moment: function (date) {
            return moment(date, "HH:mm:ss").format("hh:mm a");
        },
        checkSched(schedule) {
            if(schedule.day == moment().format('dddd').toUpperCase()){
                let today = moment()
                return today.valueOf() >= moment(schedule.time_start, "HH:mm:ss").valueOf() && today.valueOf() <= moment(schedule.time_end, "HH:mm:ss").valueOf()
            }
            return false;
        },
        checkIfToday(date){
            let created = moment(date)
            let today = moment()
            // console.log(created,today,created.isSame(today, 'day'))
            return created.isSame(today, 'day');
        },
        dateFromDay(day = null){
            return day != "All" ? moment().day(day).format('MM/DD/YYYY') : moment().format('MM/DD/YYYY')
        },
        humanRead(date){
            return moment(date).format("MMMM Do YYYY, h:mm a")
        },
        dateSlash(date){
            return moment(date).format('MM/DD/YYYY')
        }
    }
}
</script>