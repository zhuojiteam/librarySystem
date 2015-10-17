/**
 * Created by chenyulu on 15/10/17.
 */
$(document)
    .ready(function() {
        $('.special.card .image').dimmer({
            on: 'hover'
        });
        $('.star.rating')
            .rating()
        ;
        $('.card .dimmer')
            .dimmer({
                on: 'hover'
            })
        ;
    })
;
