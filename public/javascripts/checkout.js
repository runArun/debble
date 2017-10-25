Stripe.setPublishableKey('pk_test_3bcIXVPgFnP4oaHNlgv9baS0');

var $form = $('#checkout-form');

$form.submit(function (event) {
    $form.find('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled',true);//submit once;

    Stripe.card.createToken({
        number: $('＃cardNumber').val(),
        cvc: $('＃cvCode').val(),
        exp_month: $('＃expiryMonth').val(),
        exp_year: $('＃expiryYear').val(),
        name: $('＃cardHolder').val(),
    }, stripeResponseHandler);
    return false;
});

//反正就是这部分过时了，得用最新的方法 https://stripe.com/docs/elements/migrating

function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        $form.find('#charge-error').text(response.error.message);
        $form.find('#charge-error').removeClass('hidden');

        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }

}