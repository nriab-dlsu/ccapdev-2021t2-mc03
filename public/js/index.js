$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#refno` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#refno` text field background color turns to red
            - `#error` displays an error message `Reference number already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#refno` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#refno').keyup(function () {
        // your code here

        var refno = $('#refno').val();

        $.get('/getCheckRefNo', { refno: refno }, function (result) {

            if (refno == result.refno) {
                $('#refno').css('background-color', 'red');
                $('#error').text('Reference number already in the database');
                $('#submit').prop('disabled', true);
            } else {
                $('#refno').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */
    $('#submit').click(function () {
        // your code here
        var name = $('#name').val();
        var refno = $('#refno').val();
        var amount = $('#amount').val();

        if (name != '' && refno != '') {

            $.get('/add', { name: name, refno: refno, amount: amount }, function (result) {
                // append the rendered html and reset inputs
                $('#cards').append(result);
                $('#name').val('');
                $('#refno').val('');
                $('#amount').val('');
            })

        } else {
            $('#error').text('Fill up all fields.');
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#cards`.
            The code deletes the specific transaction associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.card`.
    */
    $('#cards').on('click', '.remove', function () {
        // your code here
        var $t = $(this);
        // get the refno, this will be used to delete the Transaction from the db
        var refno = $(this).parent().find('p:nth-child(2)').text();

        $.get('/delete', { refno: refno }, function (flag) {
            if (flag) {
                $t.parent().remove();
            }
        });

    });


})
