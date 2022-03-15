<template>
    <ion-page class="pages">
        <ion-row class="class-details">
            <ion-col size=12> 
                 <ion-button class="back-button" @click="$router.back()">
                    <ion-icon color="light" :icon="caretBackOutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col size=12>
                <h1 class="class-title"><strong> Class #{{class_detail.id}} </strong></h1>
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
                        <h3 class="subject-text">{{class_detail.teacher.full_name}}</h3>
                    </ion-text>
                    <ion-text >
                        <p >{{abbrDay(class_detail.schedule.day)}} {{time_moment(class_detail.schedule.time_start)}} to {{time_moment(class_detail.schedule.time_end)}}</p>
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
                    <ion-text color="secondary">
                        <h3 class="subject-text">
                            <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
                        </h3>
                    </ion-text>
                    <ion-text >
                        <p >
                            <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>     
                        </p>
                    </ion-text>
                </ion-label>
            </ion-col>
            <ion-col size=3>
                <ion-thumbnail>
                    <img :src=" '/assets/img/person-icon.png'" />
                </ion-thumbnail>
            </ion-col>
            <ion-col size=12 class="statistics">
                <ion-row class="ion-justify-content-around">
                    <ion-col size=4 >
                        <span class="stat-label"> Present </span>
                        <div class="statistic-card">
                            <span> {{class_detail.statistics.present}}</span>
                        </div> 
                    </ion-col>
                    <ion-col size=4 >
                        <span class="stat-label"> Absent </span>
                        <div class="statistic-card">
                            <span> {{class_detail.statistics.absent}}</span>
                        </div> 
                        </ion-col>
                    <ion-col size=4 >
                        <span class="stat-label"> Late </span>
                        <div class="statistic-card">
                            <span> {{class_detail.statistics.late}}</span>
                        </div> 
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-col size=12 class="ion-margin-top">
                <ion-row>
                    <!-- <ion-col size=6 class="grid-no-padding">
                        <ion-button expand="block" class="add-button" @click="addStudentModal()">
                            <ion-icon color="light" :icon="addCircleOutline" ></ion-icon>
                            Add Student
                        </ion-button>
                    </ion-col> -->
                    <ion-col class="grid-no-padding" size=6>
                        <ion-label>
                            <h2 class="attendance-text"><strong> Attendance </strong></h2>
                        </ion-label>
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
        <ion-list>
            <div v-if="!getting_attendance">
                <ion-item v-for="student_attendance in attendances" :key="student_attendance.id" class="attendance-detail">
                    <ion-grid class="ion-no-padding">
                            <ion-row class="ion-justify-content-around">
                                <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">{{dateSlash(student_attendance.date_of_attendance)}}</ion-label></ion-col>
                                <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" >{{time_moment(student_attendance.time_in)}}</ion-label></ion-col>
                                <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" :color="checkColorForRemark(student_attendance.remarks)">{{checkRemarkValue(student_attendance.remarks)}}</ion-label></ion-col>
                            </ion-row>
                    </ion-grid>
                </ion-item>
            </div>
            <div v-else>
                <ion-item v-for="rep in 5" :key="rep" class="attendance-detail">
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
                                            <ion-img src="/assets/img/eye_btn.png" class="action-btn dark"></ion-img>
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
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonImg,IonGrid,IonItem,IonList} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';
// import ClassDetail from '@/components/ClassDetail.vue'
// import AttendanceDetail from '@/components/AttendanceDetail.vue'

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonImg,IonGrid,IonItem,IonList,
    },
    data : () => ({
        caretBackOutline,addCircleOutline,pencilOutline,trashOutline,
        class_detail : {
            statistics :{absent: 0, present: 0, late: 0, excused: 0}
        },
        getting_class : true,
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
            this.$axios.get('student/v1/class-detail/'+this.$route.params.id).then(({data}) => {
                this.class_detail = data
                // console.log(this.class_detail.statistics)
                this.getting_class = false
                this.getAttendances()
            })

        },
        getAttendances(){
            this.getting_attendance = true
            let params = {
            }
            this.$axios.get('student/v1/class-detail/'+this.$route.params.id+'/get-attendances',{params}).then(({data}) => {
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
                    return 'tertiary';
                default :
                    break;
            }
        },
    }
}
</script>

<style scoped lang="scss">
    .subject-text {
        padding-top: 1px;
    }
    ion-col.statistics {
        text-align: center;
        
        .stat-label {
            color: var(--ion-color-dark);
            font-size: 12px;
            font-weight: bold;
        }
    }
    
    .statistic-card {
        height : 75px;
        width: 75px;
        margin-left: auto;
        margin-right: auto;
        background: var(--ion-color-light);
        color : var(--ion-color-secondary);
        border-radius: 5px;
        margin-top: 5px;

        span {
            margin: auto;
            line-height: 75px;
            font-size: 35px;
            font-weight: bold;
        }
    }
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
        height: 30px;
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
        height: 25%;
        overflow: hidden;
        overflow-y: scroll;
    }
    .attendance-text {
        padding-top: 10px;
    }
</style>
<style lang="scss" >

    .remove-student-alert {
        .alert-wrapper {
            border-radius: 5px;
            .alert-head {
                background: var(--ion-color-primary);
                margin-bottom : 12px;
                .alert-title {
                    text-align: center;
                    color : var(--ion-color-light);
                }
            }
            .alert-button-group {
                display: flex;
                justify-content: center;
                width: 100%;
                button {
                    border: 1px solid var(--ion-color-primary);
                    width: 45%;
                    border-radius: 6px;
                    &:first-child {
                        background: var(--ion-color-success);
                        color: white;
                        border: 1px solid var(--ion-color-success);
                    }
                    &:last-child {
                        background: var(--ion-color-danger);
                        color: white;
                        border: 1px solid var(--ion-color-danger);
                    }
                    span {
                        display: flex;
                        justify-content: center;
                    }
                }
            }
        }
    }
    .update-student-attendance-remark-alert {
        .alert-wrapper {
            border-radius: 5px;
            .alert-head {
                background: var(--ion-color-primary);
                margin-bottom : 12px;
                .alert-title {
                    text-align: center;
                    color : var(--ion-color-light);
                }
            }
            .alert-button-group {
                display: flex;
                justify-content: center;
                flex-direction: row;
                width: 100%;
                button {
                    border: 1px solid var(--ion-color-primary);
                    width: 21%;
                    border-radius: 6px;
                    &:first-child {
                        background: var(--ion-color-success);
                        color: white;
                        border: 1px solid var(--ion-color-success);
                    }
                    &:nth-child(2) {
                        background: var(--ion-color-warning);
                        color: white;
                        border: 1px solid var(--ion-color-warning);
                    }
                    &:nth-child(3) {
                        background: var(--ion-color-tertiary);
                        color: white;
                        border: 1px solid var(--ion-color-tertiary);
                    }
                    &:last-child {
                        background: var(--ion-color-danger);
                        color: white;
                        border: 1px solid var(--ion-color-danger);
                    }
                    span {
                        display: flex;
                        font-size: 11px;
                        font-weight: bold;
                        justify-content: center;
                    }
                }
            }
        }
    }
</style>
