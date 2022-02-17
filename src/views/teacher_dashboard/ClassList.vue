<template>
  <ion-page class="pages">
    <ion-row class="ion-justify-content-between class-list">
      <ion-col>
        <h1 class="class-title"><strong> Classes </strong></h1>
      </ion-col>
      <ion-col >
        <div class="ion-text-end">
          <h6 class="class-count">({{class_details.length}} classes)</h6>
        </div>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size=6>
        <ion-select :interface-options="select_options" :selected-text="selected_subject" :value="selected_subject" @ionChange="selected_subject = $event.target.value" interface="popover" class="selection-filter">
          <ion-select-option v-for="subject in subjects" :key="subject.id" :value="subject.name">{{subject.name}}</ion-select-option>
        </ion-select>
      </ion-col>
      <ion-col size=6>
        <ion-select :interface-options="select_options" :selected-text="selected_day" :value="selected_day" @ionChange="selected_day = $event.target.value" interface="popover" class="selection-filter">
          <ion-select-option v-for="day in days" :key="day" :value="day">{{day}}</ion-select-option>
        </ion-select>
      </ion-col>
    </ion-row>
    <ion-row class="ion-justify-content-between ion-margin-top">
      <ion-col>
        <h6><strong> {{selected_day == "All" ? "Today" : "Date"}} </strong></h6>
      </ion-col>
      <ion-col >
        <div class="ion-text-end">
          <h6 > <strong>{{dateFromDay(selected_day)}}</strong></h6>
        </div>
      </ion-col>
    </ion-row>
    <ion-list>
      <div v-if="!getting_classes" >
        <ion-item class="class-list-item" :class="checkSched(class_detail.schedule) ? 'class-ongoing':'not-ongoing'" @click="viewClassDetail(class_detail)" v-for="class_detail in class_details" :key="class_detail.id">
          <ion-button  disabled fill="clear" slot="end" :color="checkSched(class_detail.schedule) ? 'light':'primary'">
            <ion-icon size="large" :icon="people"></ion-icon>
            <ion-badge :color="checkSched(class_detail.schedule) ? 'light':'primary'">
              {{class_detail.student_count}}
            </ion-badge>
          </ion-button>
          <ion-label>
            <ion-text :color="checkSched(class_detail.schedule) ? 'light':'primary'">
              <h2 class="subject-text subject-title" >{{class_detail.subject.name}}</h2>
            </ion-text>
            <ion-text :color="checkSched(class_detail.schedule) ? 'light':'dark'">
              <h3 class="subject-text">{{class_detail.room.name}}</h3>
              <p class="subject-sched">{{abbrDay(class_detail.schedule.day)}} {{time_moment(class_detail.schedule.time_start)}} to {{time_moment(class_detail.schedule.time_end)}}</p>
            </ion-text>
          </ion-label>
        </ion-item>
      </div>
      <div v-else>
        <ion-item class="class-list-item not-ongoing" v-for="i in 7" :key="i">
          <ion-button  disabled fill="clear" slot="end" color="primary" >
            <ion-skeleton-text></ion-skeleton-text>
            <ion-skeleton-text></ion-skeleton-text>
          </ion-button>
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

<script >
import { IonPage,IonList,IonItem,IonLabel,IonButton,IonIcon,IonBadge,IonSelect,IonSelectOption,IonCol,IonRow,IonSkeletonText,IonText} from '@ionic/vue';
import { people } from 'ionicons/icons';
import moment from 'moment';

// import ClassDetail from '@/components/ClassDetail.vue'

export default  {
  name: 'ClassDetails',
  components: { 
    IonPage,IonList,IonItem,IonLabel,IonButton,IonIcon,IonBadge,IonSelect,IonSelectOption,IonCol,IonRow,IonSkeletonText,IonText,
  },
  data : () => ({
    people,
    class_details : [],
    days : ['All','SUNDAY', 'MONDAY', 'TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'],
    subjects : [
      {
        id : 0,
        name : "All"
      }
    ],
    selected_subject: 'All',
    selected_day : 'All',
    select_options : {
      cssClass : 'select-option-filter'
    },
    getting_classes : false

  }),
  ionViewWillEnter(){
    this.selected_day = this.days[moment().day()]
    this.initialize()
    this.getSubjects()
  },
  mounted (){
    this.selected_day = this.days[moment().day()]
    this.initialize()
    this.getSubjects()
  },
  watch : {
    selected_subject : {
      handler(){
        this.initialize()
      }
    },
    selected_day : {
      handler() {
        this.initialize()
      }
    }
  },
  methods : {
    initialize(){
      this.getting_classes = true
      let params = {
        subject_key: this.selected_subject == "All" ? null : this.selected_subject,
        day : this.selected_day == "All" ? null : this.selected_day
      }
      
      this.$axios.get('teacher/v1/class-details',{params}).then(({data}) => {
        this.class_details = data
        this.getting_classes = false
      })
    },
    getSubjects(){
      this.$axios.get('teacher/v1/subjects').then(({data}) => {
        this.subjects.push(...data)
      })
    },
    viewClassDetail(class_detail){
      this.$router.push('/teacher/class-detail/'+class_detail.id)
    //   const modal = await modalController.create({
    //     component: ClassDetail, 
    //     componentProps: {
    //       class_detail
    //     },
    //     cssClass: "class-detail-modal"
    //   });
    //   return modal.present();
    },
  }
}
</script>

<style scoped>
ion-select::part(text) {
  color: var(--ion-color-primary);
  /* color: brown; */
}
.class-count {
  margin-bottom : 10px;
  margin-top: 28px;
}
.class-title {
  color : #120055;
}
.class-list {
  margin-top: 30px;
}
.selection-filter {
  border: 1px solid #CFCFCF;
  border-radius: 10px;
}
ion-select::part(icon) {
   color: var(--ion-color-secondary)!important;
   opacity: 1;
}   
ion-select::part(placeholder),
ion-select::part(text) {
  color: #000000;
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