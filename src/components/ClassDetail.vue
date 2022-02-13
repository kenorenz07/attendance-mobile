<template>
    <ion-header>
        <ion-toolbar color="primary">
            <ion-title>
                <h2>
                    {{class_detail.subject.name}}
                </h2>
            </ion-title>
        </ion-toolbar>

    </ion-header>
    <ion-content class="ion-padding">
        <ion-text color="primary">
            <label>
                Next sched. : <strong>{{class_detail.schedule.day}}, {{nextDate}}</strong>   
            </label>
            <h1 class="time-sched">
                <strong> {{time_moment(class_detail.schedule.time_start)}} to {{time_moment(class_detail.schedule.time_end)}}</strong>
            </h1>
        </ion-text>
  </ion-content>
</template>

<script>
import moment from 'moment'
import { IonContent, IonHeader, IonToolbar,IonText } from "@ionic/vue";

export default {
  components: { IonContent, IonHeader, IonToolbar,IonText },
  props : {
    class_detail : {
        required : true,
        type : Object
    }
  },
  computed : {
    nextDate () {
        let day;
        switch (this.class_detail.schedule.day) {
            case 'SUNDAY':
                day = 0;
                break; 
            case 'MONDAY':
                day = 0;
                break; 
            case 'TUESDAY':
                day = 0;
                break;
            case 'WEDNESDAY':
                day = 0;
                break;
            case 'THURSDAY':
                day = 0;
                break;
            case 'FRIDAY':
                day = 0;
                break;
            case 'SATURDAY':
                day = 0;
                break;   
        }
        console.log(day)
        return moment().add(1, 'weeks').isoWeekday(day).format('MMMM Do YYYY');
    }
  },
  methods : {
    
  }
};
</script>
<style scoped>
    .time-sched {
        font-size: 2em;
        margin-top: 10px;
        padding-left: 2px;
    }
    .class-detail-modal {
        margin-top : 68px;  
    }
</style>