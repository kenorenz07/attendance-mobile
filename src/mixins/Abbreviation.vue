<script>
export default {
    data: () => ({

    }),
    methods : {
        abbrDay(day) {
            switch(day) {
                case "SUNDAY" :
                    return "Su";
                case "MONDAY" :
                    return "Mo";
                case "TUESDAY" :
                    return "Tu";
                case "WEDNESDAY" :
                    return "We";
                case "THURSDAY" :
                    return "Th";
                case "FRIDAY" :
                    return "Fr";
                case "SATURDAY" :
                    return "Sa";
                default :
                    break;
            }
        }
    }
}
</script>