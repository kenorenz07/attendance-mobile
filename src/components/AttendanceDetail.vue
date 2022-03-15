<template>
  <ion-page>
    <div class="alert-head sc-ion-alert-md">
        <h2 id="alert-2-hdr" class="alert-title sc-ion-alert-md">{{class_student.student.display_name}}</h2>
    </div>
    <ion-row class="ion-justify-content-around">
        <ion-col size=4 >
            <span class="stat-label"> Present </span>
            <div class="statistic-card">
                <span> {{class_student.statistics.present}}</span>
            </div> 
        </ion-col>
        <ion-col size=4 >
            <span class="stat-label"> Absent </span>
            <div class="statistic-card">
                <span> {{class_student.statistics.absent}}</span>
            </div> 
            </ion-col>
        <ion-col size=4 >
            <span class="stat-label"> Late </span>
            <div class="statistic-card">
                <span> {{class_student.statistics.late}}</span>
            </div> 
        </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size=12 class="ion-no-padding"> 
        <ion-text color="primary">
          <ion-label>Time in : {{time_moment(class_student.attendance.time_in)}}</ion-label>
        </ion-text>
      </ion-col>
      <ion-col size=12 class="ion-no-padding"> 
         <ion-text color="primary">
          <ion-label>Time out : {{time_moment(class_student.attendance.time_out)}}</ion-label>
        </ion-text>
      </ion-col>
    </ion-row>
    <ion-row></ion-row>
  </ion-page>
</template>

<script>
import { 
    IonRow,IonCol,IonPage,IonText,IonLabel,
  modalController,
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  components: { 
      IonRow,IonCol,IonPage,IonText,IonLabel,
  },
  props: {
    class_student : {
      default: null,
      required: true
    }
  },
  data : () => ({
    arrowBackOutline,
    quantity: 1,
    select_options : {
        cssClass : 'select-option-filter'
    },
    selected_student: {
        display_name_mobile: "Select student"
    },
    available_students: [],
    
  }),
  computed : {
  },
  mounted (){
  },
  methods : {
    closeModal(){
      return modalController.dismiss();
    },
  }
};
</script>
<style scoped lang="scss">
    ion-col {
        text-align: center;
        
        .stat-label {
            color: var(--ion-color-dark);
            font-size: 12px;
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

        span {
            margin: auto;
            line-height: 75px;
            font-size: 30px;
        }
    }
  .selection-filter-students {
        border: 1px solid #CFCFCF;
        border-radius: 6px;
        height: 44px;
        width: 85%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom : 23px;
        color:var(--ion-color-dark);
    }
</style>
<style  lang="scss" >
    
ion-modal.class-attendance-modal {
  @media (min-width: 300px) and (min-height: 500px) {
    ion-backdrop {
      visibility: visible;
    }
  }

  .modal-wrapper {
    border-radius: 5px;
    position: absolute;
    overflow: hidden;
    max-width: 280px;
    width: 80vw;
    height: 33vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 0;
    box-shadow: 0 16px 20px rgba(0,0,0,.4);
    background-color: #fafafa;
    ion-page {
        justify-content: inherit!important;
    }
    .alert-head {
        background: var(--ion-color-primary);
        // margin-bottom : 12px;
        height: 70px;

        padding-left: unset;
        padding-right: unset;
        -webkit-padding-start: 23px;
        padding-inline-start: 23px;
        -webkit-padding-end: 23px;
        padding-inline-end: 23px;
        padding-left: 23px;
        padding-right: 23px;
        padding-top: 20px;
        padding-bottom: 15px;
        text-align: start;
        .alert-title {
            text-align: center;
            color : var(--ion-color-light);
            margin: 0;
            font-size: 16px;
        }

            
    }

    .alert-button-group {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50px;
        button {
            border: 1px solid var(--ion-color-primary);
            width: 40%;
            border-radius: 6px;
            &:first-child {
                background: var(--ion-color-light);
                color: var(--ion-color-primary);
                border: 1px solid var(--ion-color-primary);
            }
            &:last-child {
                background: var(--ion-color-primary);
                color: white;
                border: 1px solid var(--ion-color-primary);
                margin-left: 10px;
            }
            span {
                display: flex;
                justify-content: center;
                font-size: 15px;
            }
        }
    }
  }
}
</style>