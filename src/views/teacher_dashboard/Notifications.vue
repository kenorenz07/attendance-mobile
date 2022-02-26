<template>
    <ion-page class="pages">
        <ion-row class="class-details">
            <ion-col size=12> 
                 <ion-button class="back-button" @click="$router.back()">
                    <ion-icon color="light" :icon="caretBackOutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col size=12>
                <h1 class="class-title"><strong> Notifications </strong></h1>
            </ion-col>
        </ion-row>
        <ion-list>
            <div v-if="false">
                <ion-item class="class-list-item" :class="true ? 'class-ongoing':'not-ongoing'" @click="viewClassDetail(class_detail)" v-for="class_detail in class_details" :key="class_detail.id">
                    <ion-label>
                        <ion-text :color="true ? 'light':'primary'">
                            <h2 class="subject-text subject-title" >{{class_detail.subject.name}}</h2>
                        </ion-text>
                        <ion-text :color="true ? 'light':'dark'">
                            <h3 class="subject-text">{{class_detail.room.name}}</h3>
                            <p class="subject-sched">{{abbrDay(class_detail.schedule.day)}} {{time_moment(class_detail.schedule.time_start)}} to {{time_moment(class_detail.schedule.time_end)}}</p>
                        </ion-text>
                    </ion-label>
                </ion-item>
            </div>
            <div v-else>
                <ion-item class="class-list-item not-ongoing" v-for="i in 7" :key="i">
                    <ion-label>
                        <h2 class="subject-text subject-title">
                        <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
                        </h2>
                        <h3 class="subject-text">
                        <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
                        </h3>
                        <p class="subject-sched"> 
                        <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
                        </p>
                    </ion-label>
                </ion-item>
            </div>
        </ion-list>
    </ion-page>
</template>

<script>
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonSkeletonText,IonItem,IonList,
    },
    data : () => ({
        caretBackOutline,addCircleOutline,pencilOutline,trashOutline,
        notifications : {},
        getting_notifications : true,
        days : [],
        selected_day : '',
        select_options : {
            cssClass : 'select-option-filter'
        },
        attendances :[],
        getting_attendance :false,
        available_students : []
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted () {
        this.initialize()
    },
    watch : {
    },
    methods : {
        initialize(){
            this.getting_notifications = true
            this.$axios.get('teacher/v1/notifications/').then(({data}) => {
                this.notifications = data
                this.getting_notifications = false
            })

        },


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
    .class-list-item {
        --min-height :100px;
        --border-radius: 5px;
        margin-bottom: 10px;
    }
    .class-ongoing {
        --background: var(--ion-color-secondary);
        --border-color: var(--ion-color-secondary);
        --color : var(--ion-color-light);
    }

    .not-ongoing {
        --background: var(--ion-color-light);
        --border-color: var(--ion-color-light);
        --color : var(--ion-color-dark);
    }
    ion-list {
        height: 57vh;
        overflow: hidden;
        overflow-y: scroll;
    }

</style>
