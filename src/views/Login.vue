<template>
    <ion-page class="login-page">
        <ion-content>
            <div slot="fixed">
                <ion-grid>
                    <ion-row class="ion-justify-content-center logo-img">
                        <ion-col size=10>
                            <div class="ion-text-center ion-margin">
                                <ion-img  src="/assets/img/lenzy_logo_small.png"></ion-img>
                                
                                <ion-text color="tertiary">
                                    <h6 >Welcome to Attendance App</h6>
                                </ion-text>
                            </div>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col align-self-center>
                            <div class="ion-text-center ion-margin login-form">
                                <ion-item color="transparent">
                                    <ion-label color="primary">User. :</ion-label>
                                    <ion-input color="primary" v-model="user.username" type="text"></ion-input>
                                    <ion-icon color="primary" :icon="person" slot="end"></ion-icon>
                                </ion-item>
                                <ion-item color="transparent">
                                    <ion-label color="primary">Pass. :</ion-label>
                                    <ion-input color="primary" v-model="user.password" :type="show_pass ?'text' :'password'" ></ion-input>
                                    <ion-icon color="primary" :icon="!show_pass ? eye : eyeOff" slot="end" @click="show_pass = !show_pass"></ion-icon>
                                </ion-item>
                                <ion-button class="login-btn ion-margin-top" @click="loginUser()" expand="block">Login</ion-button>
                                <ion-spinner v-if="loading" class="loading-spinner" color="tertiary"></ion-spinner>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage,IonContent, IonGrid,IonRow,IonCol,IonImg,IonButton,IonItem,IonInput,IonIcon,IonText,IonSpinner,IonLabel } from '@ionic/vue'
import { person ,eye,eyeOff} from 'ionicons/icons';

export default {
    components : {
        IonPage,IonContent, IonGrid,IonRow,IonCol,IonImg,IonButton,IonItem,IonInput,IonIcon,IonText,IonSpinner,IonLabel
    },
    mounted () {
    },
    data : () => ({
        person,
        eye,
        eyeOff,
        show_pass: false,
        loading: false,
        user: {
            username : 'teacher_123', // teacher
            // username : 'student_123', // student
            password : 123123
        }
    }),
    methods : {
        async loginUser() {
            this.loading = true
            const teacher_res = await this.$axios.post('teacher/login', this.user)
            const student_res = await this.$axios.post('student/login', this.user)

            if(teacher_res.data.token){
                this.loading = false
                localStorage.setItem("user_type","teacher")
                localStorage.setItem("token", teacher_res.data.token);
                this.$router.push('/teacher/class-details');
                this.successNotify("Teacher login successfully")
            }
            else if(student_res.data.token){
                this.loading = false
                localStorage.setItem("user_type","student")
                localStorage.setItem("token", student_res.data.token);
                this.$router.push('/student/class-details');
                this.successNotify("Student login successfully")
            }
            else {
                this.loading = false
                this.errorNotify("Username or Password wrong")
            }


        }
        
    }
}
</script>
<style scoped type="scss">
ion-content ion-grid {
    height: 100%;
    justify-content: center;
}

.divider {
    display: flex;
}
.divider::before,.divider::after {
    content: "";
    flex: 1;
}

.line {
    align-items: center;
    margin: 1em -1em;
    color: #000;
}
.line::before,.line::after {
    height: 1px;
    margin: 0 1em;
}
.one-line::before,.one-line::after {
    background: #000;
}

.login-page {
    background-image: url("/assets/img/bg_login3.png");
}
ion-content {
    --background: none;
    height: 100vh;
}

ion-button {
    --border-radius : none;
}

.logo-img {
    margin-top:50px;
}

.login-btn {
    margin-left: 20px;
    margin-top: 40px;
}
.login-form {
    margin-top: 100px;
}
.loading-spinner {
    margin-top: 13px;
    margin-left: 21px;
}
</style>