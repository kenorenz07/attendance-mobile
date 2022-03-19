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
                <ion-thumbnail @click="downloadAttendance">
                    <img src="/assets/img/download.png" />
                </ion-thumbnail>
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
                    <ion-col size=6 >
                        <ion-select :interface-options="select_options" :selected-text="selected_day" :value="selected_day" @ionChange="selected_day = $event.target.value" interface="popover" class="selection-filter">
                            <ion-select-option v-for="day in days" :key="day" :value="day">{{day}}</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
            </ion-col>
        </ion-row>
        <ion-list>
            <div v-if="!getting_attendance">
                <ion-item v-for="student_attendance in attendances" :key="student_attendance.id" class="attendance-detail">
                    <ion-grid class="ion-no-padding">
                            <ion-row class="ion-justify-content-around">
                                <ion-col size=4 class="ion-no-padding"><ion-label class="student-name">{{student_attendance.student.display_name_mobile}}</ion-label></ion-col>
                                <ion-col size=4 class="ion-no-padding ion-text-center"><ion-label class="attendance-status" :color="checkColorForRemark(student_attendance.attendance.remarks)">{{checkRemarkValue(student_attendance.attendance.remarks)}}</ion-label></ion-col>
                                <ion-col size=4 class="ion-no-padding">
                                    <ion-row class="ion-no-padding ion-justify-content-end">
                                        <ion-col size=4 class="ion-no-padding">
                                            <ion-img src="/assets/img/eye_btn.png" @click="seeAttendanceDetails(student_attendance)" class="action-btn"></ion-img>
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
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
import {IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonSelect,IonSelectOption,IonImg,IonGrid,IonItem,IonList,modalController} from '@ionic/vue';
import {  caretBackOutline,addCircleOutline,pencilOutline,trashOutline} from 'ionicons/icons';
// import ClassDetail from '@/components/ClassDetail.vue'
import AttendanceDetail from '@/components/AttendanceDetail.vue'
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";

export default {
    components : {
        IonPage,IonRow,IonCol,IonButton,IonIcon,IonLabel,IonText,IonThumbnail,IonSkeletonText,IonSelect,IonSelectOption,IonImg,IonGrid,IonItem,IonList,
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
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id).then(({data}) => {
                this.class_detail = data
                this.getting_class = false
                this.getDaysFilter()
            })

        },
        getDaysFilter(){
            this.$axios.get('teacher/v1/class-detail/'+this.$route.params.id+'/get-days-filter').then(({data}) => {
                this.days = data
                this.selected_day = this.dateFromDay(this.class_detail.schedule.day.toUpperCase())
                this.getAttendances()

            })

        },
        downloadAttendance(){
            let file_name = 'Class#'+this.$route.params.id+'_AttendanceSummary'+'.pdf';
            this.$axios.get('teacher/v1/generate-attendance-attendance/'+this.$route.params.id,{
                responseType: 'blob'
            })
            // .then(response => {
            //     const url = window.URL.createObjectURL(new Blob([response.data]));
            //     const link = document.createElement('a');
            //     link.href = url;
            //     link.setAttribute('download', file_name);
            //     document.body.appendChild(link);
            //     link.click();
            // })
            .then((response) => {
                return File.writeFile(
                    File.externalRootDirectory + "/Download",
                    file_name,
                    new Blob([response.data]),
                    {
                        replace: true,
                    }
                );
            })
            .then(() => {
                return FileOpener.open(
                    File.externalRootDirectory + "/Download/" + file_name,
                    "application/pdf"
                );
            })
            .catch((error) => {
                console.log(error);
            });
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
                    return 'tertiary';
                default :
                    break;
            }
        },
        async seeAttendanceDetails(class_student){
            const modal = await modalController.create({
                component: AttendanceDetail, 
                componentProps: {
                    class_student : class_student
                },
                cssClass: "class-attendance-modal"
            });
            return modal.present();
        }
        // async removeStudentFromClass(student_attendance) {
        //     const alert = await alertController.create({
        //         cssClass: 'remove-student-alert',
        //         mode: "md",
        //         header: 'Confirm Remove',
        //         message: `Do you want to remove student ${student_attendance.student.full_name} ?`,
        //             buttons: [
        //             {
        //                 text: 'Yes',
        //                 role: 'yes',
        //                 handler: () => {
        //                     this.$axios.delete(`teacher/v1/class-detail/student/${student_attendance.id}/remove-student`).then(({data}) => {
        //                         data
        //                         this.getAttendances()
        //                     })
        //                 },
        //             },
        //             {
        //                 text: 'No',
        //                 handler: () => {
        //                     // alert.dismiss();
        //                 },
        //             },
        //         ],
        //     });
        //     return alert.present();
        // },
        // async updateStatusForStudentAttendance(student_attendance) {
        //     const alert = await alertController.create({
        //         cssClass: 'update-student-attendance-remark-alert ',
        //         header: 'Update Status',
        //         mode: "md",
        //         message: `Update attendance remark for ${student_attendance.student.full_name} ?`,
        //             buttons: [
        //             {
        //                 text: 'Present',
        //                 handler: () => {
        //                     this.$axios.put(`teacher/v1/class-detial/update-attendance/${student_attendance.attendance.id}`,{remark : 1}).then(({data}) => {
        //                         data
        //                         this.getAttendances()
        //                     })
        //                 },
        //             },
        //             {
        //                 text: 'Late',
        //                 handler: () => {
        //                     this.$axios.put(`teacher/v1/class-detial/update-attendance/${student_attendance.attendance.id}`,{remark : 2}).then(({data}) => {
        //                         data
        //                         this.getAttendances()
        //                     })
        //                 },
        //             },
        //               {
        //                 text: 'Excuse',
        //                 handler: () => {
        //                     this.$axios.put(`teacher/v1/class-detial/update-attendance/${student_attendance.attendance.id}`,{remark : 3}).then(({data}) => {
        //                         data
        //                         this.getAttendances()
        //                     })
        //                 },
        //             },
        //             {
        //                 text: 'Absent',
        //                 handler: () => {
        //                     this.$axios.put(`teacher/v1/class-detial/update-attendance/${student_attendance.attendance.id}`,{remark : 0}).then(({data}) => {
        //                         data
        //                         this.getAttendances()
        //                     })
        //                     alert.dismiss();
        //                 },
        //             },
        //         ],
        //     });
        //     return alert.present();
        // },
        // async addStudentModal(){
        //     console.log('sgs')
        //     const modal = await modalController.create({
        //         component: ClassDetail, 
        //         componentProps: {
        //             class_id : this.$route.params.id
        //         },
        //         cssClass: "add-student-modal"
        //     });
        //     return modal.present();
        // }

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
        height: 45%;
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
