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
            <div v-if="!getting_attendance">
                <ion-item v-for="attendance in attendances" :key="attendance.id">
                    <ion-grid class="ion-no-padding">
                            <ion-row class="ion-justify-content-around">
                                <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">{{attendance.student.display_name_mobile}}</ion-label></ion-col>
                                <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" :color="checkColorForRemark(attendance.attendance.remarks)">{{checkRemarkValue(attendance.attendance.remarks)}}</ion-label></ion-col>
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
            </div>
            <div v-else>
                <ion-item v-for="rep in 5" :key="rep">
                    <ion-grid class="ion-no-padding">
                            <ion-row class="ion-justify-content-around">
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-label class="student-name">
                                        <ion-skeleton-text ></ion-skeleton-text>

                                    </ion-label>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding ion-text-center">
                                    <ion-label class="attendance-status" color="primary">
                                        <ion-skeleton-text ></ion-skeleton-text>
                                    </ion-label>
                                </ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-row class="ion-no-padding ion-justify-content-end">
                                        <ion-col size=4 class="ion-no-padding">
                                            <ion-img src="/assets/img/edit_button.png" class="action-btn dark"></ion-img>
                                        </ion-col>
                                        <ion-col size=4 class="ion-no-padding">
                                            <ion-img src="/assets/img/delete_btn.png" class="action-btn dark"></ion-img>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                    </ion-grid>
                </ion-item>
            </div>
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
        attendances :[],
        getting_attendance :false
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted () {
        this.initialize()
        this.getDaysFilter()
    },
    watch : {
        selected_day : {
            handler(val) {
                if(val){
                    this.getAttendances()
                }
            }
        }
    },
    methods : {
        initialize(){
            this.getting_class = true
            this.getting_attendance = true
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id).then(({data}) => {
                this.class_detail = data
                this.getting_class = false
            })
        },
        getDaysFilter(){
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id+'/get-days-filter').then(({data}) => {
                this.days = data
                this.selected_day = this.dateFromDay(this.class_detail.schedule.day.toUpperCase())
                this.getAttendances()

            })

        },
        getAttendances(){
            this.getting_attendance = true
            let params = {
                date_filter : this.selected_day
            }
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id+'/get-attendances',{params}).then(({data}) => {
                this.attendances = data
                this.getting_attendance = false
            })
        },
        checkRemarkValue(remark) {

            switch(remark) {
                case 0 :
                    return 'Absent';
                case 1 :
                    return 'Present';
                case 2 :
                    return 'Late';
                case 3:
                    return 'Excused';
                default :
                    break;
            }
        },
        checkColorForRemark(remark) {
            switch(remark) {
                case 0 :
                    return 'danger';
                case 1 :
                    return 'success';
                case 2 :
                    return 'warning';
                case 3:
                    return 'info';
                default :
                    break;
            }
        }
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
    .action-btn.dark {
        filter: brightness(44%);
    }
    ion-list {
        height: 32vh;
        overflow: hidden;
        overflow-y: scroll;
    }
  
</style>
