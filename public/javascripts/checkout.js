Stripe.setPublishableKey('pk_test_LyU4ALKqJzpkbZKyREe79DtF');

var $form = $('#checkout-form');

$form.submit(function (event) {
    $('#charge-error').addClass('d-none');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) { // problem

        // show the error on the form
        $('#charge-error').removeClass('d-none');
        console.log('error on submission');
        $('#charge-error').text(response.error.message);


        $form.find('button').prop('disabled', false); //Re enable submission
    } else {
        const token = response.id;
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        $form.get(0).submit();
    }
}