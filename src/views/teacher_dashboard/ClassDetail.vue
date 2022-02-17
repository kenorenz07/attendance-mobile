<template>
    <ion-page class="pages">
        <ion-row class="class-details">
            <ion-col size=12> 
                 <ion-button class="back-button" @click="$router.back()">
                    <ion-icon color="light" :icon="caretBackOutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col size=12>
                <h1 class="class-title"><strong> Class Details </strong></h1>
            </ion-col>
            <ion-col size=9 v-if="!getting_class">
                <ion-label>
                    <ion-text>
                        <h2 class="subject-text subject-title" >{{class_detail.subject.name}}</h2>
                    </ion-text>
                    <ion-text color="secondary">
                        <h3 class="subject-text">{{class_detail.room.name}}</h3>
                    </ion-text>
                    <ion-text >
                        <p class="subject-sched">{{abbrDay(class_detail.schedule.day)}} {{time_moment(class_detail.schedule.time_start)}} to {{time_moment(class_detail.schedule.time_end)}}</p>
                    </ion-text>
                </ion-label>
            </ion-col>
            <ion-col size=3>
                <ion-thumbnail>
                    <img src="/assets/img/qr_code.png" />
                </ion-thumbnail>
            </ion-col>

            <ion-col size=12 class="ion-margin-top">
                <ion-row>
                    <ion-col size=6 class="add-student-block">
                        <ion-button expand="block" class="add-button">
                            <ion-icon color="light" :icon="addCircleOutline"></ion-icon>
                            Add Student
                        </ion-button>
                    </ion-col>
                    <ion-col size=6 >
                        <ion-select :interface-options="select_options" :selected-text="selected_day" :value="selected_day" @ionChange="selected_day = $event.target.value" interface="popover" class="selection-filter">
                            <ion-select-option v-for="day in days" :key="day" :value="day">{{day}}</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
    </ion-page>
</template>

<script>
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail
    },
    data : () => ({
        caretBackOutline,addCircleOutline,
        class_detail : {},
        getting_class : true,
        days : ['All','SUNDAY', 'MONDAY', 'TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'],
        selected_day : 'All',

    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted () {
        this.initialize()
    },
    methods : {
        initialize(){
            console.log('gaga')
            this.getting_class = true
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id).then(({data}) => {
                this.class_detail = data
                this.getting_class = false
            })
        }
    }
}
</script>

<style scoped>
    .class-details{
        margin-top :30px;
    }
    .class-title {
        margin-top :15px;
        color : #120055;
    }
    ion-thumbnail {
        --size:74px;
    }
    .selection-filter {
        border: 1px solid #CFCFCF;
        border-radius: 10px;
        height: 44px;
    }
    .add-button {
        height: 44px;
    }
    .add-student-block {
        --ion-grid-column-padding : 0!important;
    }
</style>