<template>
  <ion-page>
    <div class="alert-head sc-ion-alert-md">
        <h2 id="alert-2-hdr" class="alert-title sc-ion-alert-md">Student Assigning</h2>
    </div>

    <ion-select :interface-options="select_options" placeholder="Select student" :selected-text="selected_student.display_name_mobile" :value="selected_student" @ionChange="selected_student = $event.target.value" interface="popover" class="selection-filter-students">
        <ion-select-option v-for="student in available_students" :key="student.id" :value="student">{{student.display_name_mobile}}</ion-select-option>
    </ion-select>
    <div class="alert-button-group sc-ion-alert-md">
        <button type="button" @click="closeModal()" class="alert-button ion-focusable ion-activatable alert-button-role-yes sc-ion-alert-md" tabindex="0">
            <span class="alert-button-inner sc-ion-alert-md">Cancel</span>
            <ion-ripple-effect class="sc-ion-alert-md ios hydrated" role="presentation"></ion-ripple-effect>
        </button>
        <button type="button" @click="addStudentToClass()" class="alert-button ion-focusable ion-activatable sc-ion-alert-md" tabindex="0">
            <span class="alert-button-inner sc-ion-alert-md">Add</span>
            <ion-ripple-effect class="sc-ion-alert-md ios hydrated" role="presentation"></ion-ripple-effect>
            </button>
        </div>
  </ion-page>
</template>

<script>
import { 
    IonSelect,
    IonSelectOption,   
    IonRippleEffect, 
  modalController,
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  components: { 
    IonSelect,
    IonSelectOption,  
    IonRippleEffect,    
  },
  props: {
    class_id : {
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
    this.getAvailableStudents()
  },
  methods : {

    getAvailableStudents(){
        let params = {
            class_id : this.class_id
        } 

        this.$axios.get('teacher/v1/students/get-available',{params}).then(({data}) => {
            this.available_students = data
        })
    },
    closeModal(){
      return modalController.dismiss();
    },
    addStudentToClass(){
       this.$axios.post(`teacher/v1/class-detail/${this.class_id}/add-student`,{student_id:this.selected_student.id}).then(({data})=>{
           data
           this.closeModal()
       })
    },
  }
};
</script>
<style scoped lang="scss">
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
    
ion-modal.add-student-modal {
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
    height: 32vh;
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
        margin-bottom : 12px;
        height: 60px;

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
            font-size: 20px;
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