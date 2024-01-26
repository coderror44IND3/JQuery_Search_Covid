function formatNumber(number){
            if(isNaN(number) || number == null){
                return 0;
            }else{
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }}
            $('button').click(function(){
                if($('input').val().length == 0){
                    return swal('', 'Mohon Masukan Nama Negara Terlebih Dahulu!', 'warning');
                }
                var countryName = $('input').val().toLowerCase();
                swal({
                    title: "",
                    text: "Mencari Data...",
                    icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
                    button: false
                });
                $.ajax({
                    "url": "https://covid-193.p.rapidapi.com/statistics",
                    "method": "GET",
                    "data": {
                        country: countryName,
                    },
                    "headers":{
                        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
                        "X-RapidAPI-Key": "1dc23651f3msh75bde58b40a6c87p1e13adjsnb806ff6bf0db"
                    },
                    success: function(res){
                        if(res.response.length == 0){
                            return swal("Data Tidak Di Temukan!", "Pastikan Nama Negara Yang Di Tuliskan Benar", "Warning");
                        };
                        var data = res.response[0].cases;
                        console.log(data);
                        $(".active-case").text(formatNumber(data.active));
                        $(".critical-case").text(formatNumber(data.critical));
                        $(".date-case").text(formatNumber(data.date));
                        $(".recovered").text(formatNumber(data.recovered));
                        swal.close();
        
                        var newCountryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
                        $('.nama-negara').text(newCountryName);
                        
                        $('.card-statistik').show();
                    }
                });
            });