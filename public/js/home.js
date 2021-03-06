$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here
        $.get('/getCheckNumber', {number: $('#number.field').val()}, (data) => {
            if (data !== '') {
                $('#number.field').css('background-color', 'red')
                $('#error').text('Number already registered')
                $('#submit').prop('disabled', true)
            } else {
                $('#number.field').css('background-color', '#E3E3E3')
                $('#error').text('')
                $('#submit').prop('disabled', false)
            }
        })
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        let valid = true
        $('#name.field').css('background-color', '#E3E3E3')
        $('#number.field').css('background-color', '#E3E3E3')

        if ($('#name.field').val() == '') {
            valid = false
            $('#name.field').css('background-color', 'red')
        }
        if ($('#number.field').val() == '') {
            valid = false
            $('#number.field').css('background-color', 'red')
        }
        if (valid) {
            let contact = {
                name: $('#name.field').val(),
                number: $('#number.field').val()
            }
            console.log(contact)

            $.get('/add', contact, (data) => {
                $('#contacts').append(data)

                $('#name.field').val('')
                $('#number.field').val('')
            })
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        // your code here
        let pElmnts = $(this).siblings('.info').children('.text')
        let contact = {
            name: pElmnts[0].innerText,
            number: pElmnts[1].innerText
        }
        $.get('/delete', contact, () => {
            $(this).parent().remove()
        })
    });

})
