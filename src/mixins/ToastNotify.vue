<script>
import {
  toastController
} from "@ionic/vue";
export default {
    data: () => ({

    }),
    methods: {
        async successNotify(message) {
            const toast = await toastController
                .create({
                    message: message || "Success",
                    duration: 1000,
                    color: "success",
                    position: "top",
                    cssClass: "toast-notify"
                })
            return toast.present();
        },
        async errorNotify(message) { 
           const toast = await toastController
                .create({
                    message: message || "Error",
                    duration: 1000,
                    color: "danger",
                    position: "top",
                    cssClass: "toast-notify"
                })

            return toast.present();
        }
    }
};
</script>