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
            <ion-col size=9 >
                <ion-label v-if="!getting_class">
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
                 <ion-label v-else>
                    <ion-text>
                        <h2 class="subject-text subject-title" >
                            <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
                        </h2>
                    </ion-text>
                    <ion-text color="secondary">
                        <h3 class="subject-text">
                            <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
                        </h3>
                    </ion-text>
                    <ion-text >
                        <p class="subject-sched">
                            <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>     
                        </p>
                    </ion-text>
                </ion-label>
            </ion-col>
            <ion-col size=3>
                <ion-thumbnail>
                    <img src="/assets/img/qr_code.png" />
                </ion-thumbnail>
            </ion-col>

            <ion-col size=12 class="ion-margin-top ion-margin-bottom">
                <ion-row>
                    <ion-col size=6 class="grid-no-padding">
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
            <ion-col size=12 >
                <ion-row class="ion-justify-content-between ">
                    <ion-col class="grid-no-padding">
                        <ion-label>
                            <h2 ><strong> Attendance </strong></h2>
                        </ion-label>
                    </ion-col>
                    <ion-col class="grid-no-padding">
                        <ion-label>
                        <div class="ion-text-end">
                            <h6 >({{selected_day}})</h6>
                        </div>
                        </ion-label>
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
        <ion-list>
           <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Jone Da</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="success">present</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>

          <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Abdul Kajul</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="success">present</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>
          <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Salani Don</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="warning">late</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>
          <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Geta lon</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="success">present</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>
          <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Debal Iktad</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="danger">absent</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>
        <ion-item>
               <ion-grid class="ion-no-padding">
                    <ion-row class="ion-justify-content-around">
                        <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">Debal Iktad</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" color="danger">absent</ion-label></ion-col>
                        <ion-col size=4 class="ion-no-padding">
                            <ion-row class="ion-no-padding ion-justify-content-end">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/edit_button.png" class="action-btn"></ion-img>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-img src="/assets/img/delete_btn.png" class="action-btn"></ion-img>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
               </ion-grid>
          </ion-item>
        </ion-list>
    </ion-page>
</template>

<script>
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonSelect,IonSelectOption,IonImg,IonGrid,IonItem,IonList} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonSelect,IonSelectOption,IonImg,IonGrid,IonItem,IonList
    },
    data : () => ({
        caretBackOutline,addCircleOutline,pencilOutline,trashOutline,
        class_detail : {},
        getting_class : true,
        days : [],
        selected_day : '',
        select_options : {
            cssClass : 'select-option-filter'
        },
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted () {
        this.initialize()
        this.getDaysFilter()
    },
    methods : {
        initialize(){
            this.getting_class = true
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id).then(({data}) => {
                this.class_detail = data
                this.getting_class = false
            })
        },
        getDaysFilter(){
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id+'/get-days-filter').then(({data}) => {
                this.days = data
                this.selected_day = this.dateFromDay(this.class_detail.schedule.day.toUpperCase())
            })
        },
        getAttendances(){
            
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id+'/get-attendances').then(({data}) => {
                this.attendances = data
            })
        },
    }
}
</script>

<style scoped>
    .date-of-day {
        margin-bottom : 10px;
        margin-top: 21px;
    }
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
    .student-name {
        padding-top: 5px;
        font-size: 15px;
    }
    .attendance-status {
        padding-top: 7px;
        font-size : 13px;
    }
    .action-btn {
        width: 28px;
        height: 28px;
    }
    ion-list {
        height: 32vh;
        overflow: hidden;
        overflow-y: scroll;
    }
  
</style>
