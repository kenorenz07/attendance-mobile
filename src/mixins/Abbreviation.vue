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
                    return "M";
                case "TUESDAY" :
                    return "T";
                case "WEDNESDAY" :
                    return "W";
                case "THURSDAY" :
                    return "Th";
                case "FRIDAY" :
                    return "F";
                case "SATURDAY" :
                    return "Sa";
                default :
                    break;
            }
        }
    }
}
</script>