
jQuery(document).ready(function () {
    // local storage
    var index = null
    var recindex = null
    var userinfo = [
        {
            frstname: "Emmanuel",
            scndname: "Laryea",
            tel: "0543251769",
            pin: 1234,
            balance: 10000,
            profpic: "Img/EmmanuelLaryea.jpg"
        },
        {
            frstname: "Mamadou",
            scndname: "Sow",
            tel: "0559982527",
            pin: 0145,
            balance: 5000,
            profpic: "Img/mamadou.jpg"
        },
        {
            frstname: "Delu",
            scndname: "Abimbola",
            tel: "0241824673",
            pin: 1234,
            balance: 5500,
            profpic: "Img/.jpg"
        },
        {
            frstname: "Gideon",
            scndname: "Quashie",
            tel: "0240451919",
            pin: 1234,
            balance: 8000,
            profpic: "Img/.jpg"
        },
        {
            frstname: "Joseph",
            scndname: "Tham",
            tel: "0541717078",
            pin: 1234,
            balance: 7000,
            profpic: "Img/tham.jpg"
        }
    ]

    if (localStorage.getItem("momoinfo") == null) {
        setdata(userinfo)
        Data = JSON.parse(localStorage.getItem("momoinfo"))
    }
    else {
        Data = JSON.parse(localStorage.getItem("momoinfo"))
    }

    function setdata(filename) {
        localStorage.setItem("momoinfo", JSON.stringify(filename))
    }

    moneycalc = function (pin, amount) {
        if (pin == parseFloat(Data[index].pin)) {
            if (amount <= Data[index].balance && recindex == null) {
                bal = parseFloat(Data[index].balance) - parseFloat(amount)
                userinfo[index].balance = bal
                setdata(userinfo)
                alert('Transaction successful balance remaining is GH₵' + bal + '.00')
                return true
            }
            else if (amount <= Data[index].balance && recindex != null) {
                bal = parseFloat(Data[index].balance) - parseFloat(amount)
                userinfo[index].balance = bal
                recbal = parseFloat(Data[recindex].balance) + parseFloat(amount)
                userinfo[recindex].balance = recbal
                setdata(userinfo)
                alert('Transaction successful balance remaining is GH₵' + bal + '.00')
                return true
            }
            else {
                alert('balance insufficient')
            }
        }
        else {
            alert('pin incorrect')
        }
    }

    $('.container').html(login())
    function login() {
        $('.container').html(`
                <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
                <label for="entry" class="form-label" required>Enter Mobile Number</label>
                <select class="form-control" id="entry">
                <option value="">--Choose a number--</option>
                <option>0543251769</option>
                <option>0541717078</option>
                <option>0240451919</option>
                <option>0241824673</option>
                <option>0559982527</option>
                </select>
            </div>
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        `)
        $('#submit').click(function () {
            function searchuser(number) {
                for (let i = 0; i < Data[i].tel.length; i++) {
                    if (number == Data[i].tel) {
                        index = i
                        return true
                    }
                }
            }
            if ($('#entry').val() == '') {
                alert('please enter a number')
            }
            // yourArray.forEach(function (arrayItem) {
            //     var x = arrayItem.prop1 + 2;
            //     console.log(x);
            // });  
            else if (searchuser($('#entry').val())) {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { display() }, 1500)
            }
            else {
                alert('number invalid')
                $('#entry').val("")
            }
        })
    }

    function display() {
        $('.container').html(`
        <div class="row" id="display" >
        <div class="col-6 cntIcon csh">
        <div style>
            <img src= `+ Data[index].profpic + ` class="img img-fluid img-thumbnail img-round" id="mopay">
        </div>
        <div>
           Welcome <br> <strong>` + Data[index].frstname + ` ` + Data[index].scndname + `</strong>
        </div>
        </div>
        </div>
        `)
        setTimeout(() => { $('#display').fadeOut(500, function () { main() }) }, 1500)
    }

    function main() {
        $('.container').html(`
        <div class="row animate__animated animate__fadeIn">
        <div class="col-md-12" id="app">
            <div class="mb-3">
                <label for="entry" class="form-label">Enter Short Code</label>
                <input type="email" class="form-control" id="entry" placeholder="*170#">
            </div>
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        `)
        $('#submit').click(function () {
            if ($('#entry').val() == '') {
                alert('please input a code')
            }
            else if ($('#entry').val() == '*170#') {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { loadMenu() }, 1500)
            }
            else {
                alert('code is invalid')
                $('#entry').val("")
            }
        })
        $('#back').click(function () {
            login()
        })
    }

    function loadMenu() {
        $('.container').html(`
        <div class="row">
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/money_transfer.png" class="img img-fluid img-thumbnail img-round" id="transf">
            </div>
            <div>
                <strong>Transfer Money</strong>
            </div>
        </div>
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/MomoPay_PayBill.png" class="img img-fluid img-thumbnail img-round" id="mopay">
            </div>
            <div>
                <strong>Momo Pay</strong>
            </div>
        </div>
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/Airtime_Bundles.png" class="img img-fluid img-thumbnail img-round" id="airbun">
            </div>
            <div>
                <strong>Airtime Bundle</strong>
            </div>
        </div>
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/Allow_CashOut.png" class="img img-fluid img-thumbnail img-round" id="cashout">
            </div>
            <div>
                <strong>Allow CashOut</strong>
            </div>
        </div>
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/Financial_Services.png" class="img img-fluid img-thumbnail img-round" id="finans">
            </div>
            <div>
                <strong>Financial Services</strong>
            </div>
        </div>
        <div class="col-4 cntIcon animate__animated animate__bounceInUp">
            <div>
                <img src="Img/Wallet.png" class="img img-fluid img-thumbnail img-round" id="wallet">
            </div>
            <div>
                <strong>Wallet</strong>
            </div>
        </div>
        <div style="text-align:center" class="animate__animated animate__bounceInUp"><button id="back"><img src="Img/delete.png"></button></div>
        <div class="d-flex justify-content-center visually-hidden">
        <div class="spinner-border" role="status">
        </div>
        </div>
        `)
        $('img').click(function () {
            var imgs = $('img');
            for (var i = 0; i < imgs.length; i++) {
                var func = $(this).attr("id")
                $('.d-flex').removeClass('visually-hidden')
                setTimeout(() => {
                    switch (func) {
                        case "transf": transf(); break;
                        case "mopay": mopay(); break;
                        case "airbun": airbun(); break;
                        case "cashout": cashout(); break;
                        case "finans": finans(); break;
                        case "wallet": wallet(); break;
                        // default: alert('something')
                    }
                }, 1500)
            }
        })
        $('#back').click(function () {
            main()

        })
    }

    function transf() {
        $('.container').html(`
        <div class="row animate__animated animate__fadeIn">
        <div class="col-md-12" id="app">
            <div class="mb-3">
                <label for="entry" class="form-label">Enter Momo Number</label>
                <input type="number" class="form-control" id="MomoNumber" placeholder="*0244.....">
            </div>
            <div class="mb-3">
            <label for="entry" class="form-label">Enter Amount</label>
            <input type="number" class="form-control" id="amount" placeholder="Above 1">
            </div>
            <div class="mb-3">
            <label for="entry" class="form-label">Enter Reference</label>
            <input type="text" class="form-control" id="reference" placeholder="">
            </div>
            <div class="mb-3">
            <label for="entry" class="form-label">Enter Pin</label>
            <input type="password" class="form-control" id="pin" placeholder="****">
            </div>        
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        `)

        $('#submit').click(function () {
            function empty() {
                var inputs = $('input')
                for (i = 0; i < inputs.length; i++) {
                    if (inputs.eq(i).val() == 0) {
                        return true
                    }
                }
            }
            function reciever(number) {
                for (let i = 0; i < Data[i].tel.length; i++) {
                    if (number == Data[i].tel) {
                        return true
                    }
                }
            }
            function searchuser(number) {
                if (reciever(number)) {
                    recindex = i
                    console.log(recindex)
                    return true
                }
                else {
                    alert('number not a momo number')
                }
            }
            function notself(number) {
                if (number != Data[index].tel) {
                    return true
                }
                else {
                    alert('Cannot send to self')
                    $('#MomoNumber').val("")
                    return false
                }
            }
            if (empty()) {
                alert($('input').eq(i).attr("id") + ' is empty')
            }
            else if (searchuser($('#MomoNumber').val())) {
                if (notself($('#MomoNumber').val())) {
                    if (moneycalc(parseInt($('#pin').val()), parseInt($('#amount').val()))) {
                        $('#spinner').removeClass('visually-hidden')
                        $('#loading').removeClass('visually-hidden')
                        $('#ok').addClass('visually-hidden')
                        $('#submit').attr('disabled', true)
                        setTimeout(() => { location.reload() }, 1500)
                    }
                }
            }
        })
        $('#back').click(function () {
            loadMenu()
        })
    }
    function mopay() {
        $('.container').html(`
        <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
            <ol class="list-group list-group-flush" style="margin-left: 5%">
            <li class="list-group-item-flush">Momo Pay</li>
            <li class="list-group-item-flush">Pay Bill</li>
            </ol>
            </div>
            <div class="mb-3">
            <input type="number" class="form-control" id="entry" placeholder="">
            </div>        
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
    `)

        $('#submit').click(function () {
            if ($('#entry').val() == '1' || $('#entry').val() == '2') {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { loadMenu() }, 1500)
            }
            else if ($('#entry').val() == '') {
                alert('kindly select an option')
            }
            else {
                alert('option invalid')
                $('#entry').val("")
            }

        })
        $('#back').click(function () {
            loadMenu()
        })
    }

    function airbun() {
        $('.container').html(`
        <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
            <ol class="list-group list-group-flush" style="margin-left: 5%">
            <li class="list-group-item-flush">Buy Airtime</li>
            <li class="list-group-item-flush">Buy Bundle</li>
            </ol>
                </div>
            <div class="mb-3">
            <input type="number" class="form-control" id="entry" placeholder="">
            </div>        
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        `)
        $('#submit').click(function () {
            if ($('#entry').val() == '1') {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { airtime() }, 1500)
            }
            else if ($('#entry').val() == '2') {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { loadMenu() }, 1500)
            }
            else if ($('#entry').val() == '') {
                alert('kindly select an option')
            }
            else {
                alert('option invalid')
                $('#entry').val("")
            }

        })
        $('#back').click(function () {
            loadMenu()
        })

    }

    function airtime() {
        $('.container').html(`
        <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
            <label for="entry" class="form-label">Enter Amount</label>
            <input type="number" class="form-control" id="amount" placeholder="Above 1">
            </div>
            <div class="mb-3">
            <label for="entry" class="form-label">Enter Pin</label>
            <input type="password" class="form-control" id="pin" placeholder="****">
            </div>        
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        `)

        $('#submit').click(function () {
            function empty() {
                var inputs = $('input')
                for (i = 0; i < inputs.length; i++) {
                    if (inputs.eq(i).val() == 0) {
                        return true
                    }
                }
            }
            if (empty()) {
                alert($('input').eq(i).attr("id") + ' is empty')
            }
            else if (moneycalc(parseInt($('#pin').val()), parseInt($('#amount').val()))) {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { location.reload() }, 1500)
            }
        })
        $('#back').click(function () {
            airbun()
        })

    }

    function cashout() {
        $('.container').html(`
        <div style="margin:auto; text-align:center"><strong>Are you sure you want to allow Cash Out?</strong></div>
        <div class="row">
        <div class="col-4 cntIcon csh">
            <div>
                <img src="Img/yes.png" class="img img-fluid img-thumbnail img-round" id="yes">
            </div>
            <div>
                <strong>YES</strong>
            </div>
        </div>
        <div class="col-4 cntIcon csh">
            <div>
                <img src="Img/no2.png" class="img img-fluid img-thumbnail img-round" id="no">
            </div>
            <div>
                <strong>NO</strong>
            </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        <div class="d-flex justify-content-center visually-hidden">
        <div class="spinner-border" role="status">
        </div>
        </div>
        `)

        $('img').click(function () {
            if ($(this).attr("id") == "yes") {

                $('.d-flex').removeClass('visually-hidden')
                setTimeout(() => {
                    location.reload()
                },
                    1500)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'CashOut Allowed',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else if ($(this).attr("id") == "no") {
                $('.d-flex').removeClass('visually-hidden')
                loadMenu()
                alert('CashOut cancelled')
            }
        })

        $('#back').click(function () {
            loadMenu()
        })

    }

    function finans() {
        $('.container').html(`
        <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
            <ol class="list-group list-group-flush" style="margin-left: 5%">
            <li class="list-group-item-flush">Bank Services</li>
            <li class="list-group-item-flush">Savings</li>
            <li class="list-group-item-flush">Loans</li>
            <li class="list-group-item-flush">Pensions and Investments</li>
            <li class="list-group-item-flush">Insurance</li>
            <li class="list-group-item-flush">Trade Shares</li>
            </ol>
            </div>
            <div class="mb-3">
            <input type="number" class="form-control" id="entry" placeholder="">
            </div>        
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>
        `)

        $('#submit').click(function () {
            if ($('#entry').val() == '1' || $('#entry').val() == '2' || $('#entry').val() == '3' || $('#entry').val() == '4' || $('#entry').val() == '5' || $('#entry').val() == '6') {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { loadMenu() }, 1500)
            }
            else if ($('#entry').val() == '') {
                alert('kindly select an option')
            }
            else {
                alert('option invalid')
                $('#entry').val("")
            }

        })
        $('#back').click(function () {
            loadMenu()
        })

    }

    function wallet() {
        $('.container').html(`
        <div class="row">
        <div class="col-md-12" id="app">
            <div class="mb-3">
                <label for="entry" class="form-label">Enter Pin</label>
                <input type="password" class="form-control" id="entry" placeholder="****">
            </div>
            <div style="text-align: center;">
                <button class="btn btn-primary" type="button" id="submit">
                    <span id="spinner" class="spinner-border spinner-border-sm visually-hidden" role="status"
                        aria-hidden="true"></span>
                    <span id="loading" class="visually-hidden">Loading...</span>
                    <span id="ok">OK</span>
                </button>
            </div>
        </div>
        </div>
        <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>    
        `)
        $('#submit').click(function () {
            if ($('#entry').val() == '') {
                alert('please input pin')
            }
            else if ($('#entry').val() == Data[index].pin) {
                $('#spinner').removeClass('visually-hidden')
                $('#loading').removeClass('visually-hidden')
                $('#ok').addClass('visually-hidden')
                $('#submit').attr('disabled', true)
                setTimeout(() => { accdets() }, 1500)
            }
            else {
                alert('pin incorrect')
                $('#entry').val("")
            }
        })

        function accdets() {
            $('.container').html(`
            <div class="row img-div">
            <div class="col-6 cntIcon csh">
            <div>
                <img src=`+ Data[index].profpic + ` class="img img-fluid img-thumbnail img-round" id="mopay">
            </div>
        </div>
        </div>
            <div class="row">
            <div class="col-md-12" id="app">
                <div class="mb-3">
                <label for="fullname" class="form-label">Account Holder</label>
                <div class="card acc">
                <div class="card-body" id="fullname">` + Data[index].frstname + ` ` + Data[index].scndname + `</div>
                </div>
                </div>
                <div class="mb-3">
                <label for="mobile" class="form-label">Mobile Number</label>
                <div class="card acc">
                <div class="card-body" id="mobile">` + Data[index].tel + `</div>
                </div>
                </div>
                <div class="mb-3">
                <label for="balance" class="form-label">Balance</label>
                <div class="card acc">
                <div class="card-body" id="balance">GH₵` + Data[index].balance + `.00</div>
                </div>
                </div>
            </div>
            </div>
            <div style="text-align:center"><button id="back"><img src="Img/delete.png"></button></div>    
            `)
            $('#back').click(function () {
                loadMenu()
            })
        }
        $('#back').click(function () {
            loadMenu()
        })
    }

})