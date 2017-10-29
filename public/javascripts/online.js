

$(document).ready(function(){





        $('#toggle-event').change(function() {
            var t = $(this).prop('checked');
            console.log(t);
        });

        $.post("/doctor/online",
        {
            online : t
        });
});